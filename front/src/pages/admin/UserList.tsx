import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Select,
  Space,
  Table,
  type TableColumnsType,
} from "antd";

import "./UserList.css";
import "@/assets/css/admin/AdminList.css";

interface UserInfo {
  seq: number;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDt: string;
  status: string;
  regDt: string;
  modDt: string;
  useYn: string;
}

function UserList() {
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [searchType, setSearchType] = useState("id");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [status, setStatus] = useState("");

  // 회원 상태 변경 Modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // 현재 선택한 회원
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  // 변경할 회원 상태
  const [selectedStatus, setSelectedStatus] = useState("");

  // 회원 상태 표시
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "A":
        return "활동";
      case "S":
        return "정지";
      case "R":
        return "탈퇴";
      case "L":
        return "잠금";
      case "D":
        return "휴면";
      default:
        return "-";
    }
  };

  // 회원 상태 변경 Modal 열기
  const openStatusModal = (user: UserInfo) => {
    setSelectedUser(user);
    setSelectedStatus(user.status);
    setIsStatusModalOpen(true);
  };

  // Modal 닫기
  const closeStatusModal = () => {
    setSelectedUser(null);
    setSelectedStatus("");
    setIsStatusModalOpen(false);
  };

  // 회원 상태 저장
  const updateUserStatus = async () => {
    if (!selectedUser) {
      return;
    }

    if (!selectedStatus) {
      alert("변경할 상태를 선택해주세요.");
      return;
    }

    const param = {
      seq: selectedUser.seq,
      status: selectedStatus,
    };

    try {
      const resp = await fetch(
        "http://localhost:8080/admin/ajax/updateUserStatus",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        },
      );

      const result = await resp.json();

      if (result.resultCd === "S") {
        alert("회원 상태가 변경되었습니다.");

        closeStatusModal();

        // 목록 재조회
        getUserList();
      } else {
        alert("회원 상태 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원 상태 변경 중 오류 발생 : ", error);
      alert("회원 상태 변경 중 오류가 발생했습니다.");
    }
  };

  const columns: TableColumnsType<UserInfo> = [
    {
      title: "번호",
      dataIndex: "seq",
      key: "seq",
      width: 80,
    },
    {
      title: "아이디",
      dataIndex: "id",
      key: "id",

      // 아이디 클릭 → 회원 상태 변경 Modal
      render: (id: string, record: UserInfo) => (
        <button
          type="button"
          className="admin-list__user-link"
          onClick={() => openStatusModal(record)}
        >
          {id}
        </button>
      ),
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "전화번호",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "생년월일",
      dataIndex: "birthDt",
      key: "birthDt",
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusLabel(status),
    },
    {
      title: "등록일",
      dataIndex: "regDt",
      key: "regDt",
    },
    {
      title: "수정일",
      dataIndex: "modDt",
      key: "modDt",
    },
  ];

  const getUserList = async () => {
    setLoading(true);

    try {
      const resp = await fetch(
        "http://localhost:8080/admin/ajax/getUserList",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageNo,
            pageSize,
            searchType,
            searchKeyword,
            status,
          }),
        },
      );

      const result = await resp.json();

      setUserList(result.userInfoList ?? []);
      setTotal(result.total ?? 0);
    } catch (error) {
      console.error("회원 목록 조회 중 오류 발생 : ", error);
      setUserList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // 검색할 때는 무조건 1페이지부터
    if (pageNo === 1) {
      getUserList();
    } else {
      setPageNo(1);
    }
  };

  const searchReset = () => {
    setSearchType("id");
    setSearchKeyword("");
    setStatus("");

    if (pageNo === 1) {
      // 현재도 1페이지라면 직접 재조회
      setTimeout(() => {
        getUserList();
      }, 0);
    } else {
      setPageNo(1);
    }
  };

  useEffect(() => {
    getUserList();
  }, [pageNo, pageSize]);

  return (
    <div className="admin-list">
      <h2 className="admin-list__title">회원 관리</h2>

      <div className="admin-list__search">
        <Space wrap style={{ marginBottom: 15 }}>
          <Select
            value={searchType}
            style={{ width: 110 }}
            onChange={(value) => setSearchType(value)}
            options={[
              {
                value: "id",
                label: "아이디",
              },
              {
                value: "name",
                label: "이름",
              },
            ]}
          />

          <Input
            value={searchKeyword}
            style={{ width: 220 }}
            placeholder="검색어를 입력해주세요."
            onChange={(e) => setSearchKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />

          <Select
            value={status}
            style={{ width: 120 }}
            onChange={(value) => setStatus(value)}
            options={[
              {
                value: "",
                label: "전체 상태",
              },
              {
                value: "A",
                label: "활동",
              },
              {
                value: "S",
                label: "정지",
              },
              {
                value: "R",
                label: "탈퇴",
              },
              {
                value: "L",
                label: "잠금",
              },
              {
                value: "D",
                label: "휴면",
              },
            ]}
          />

          <Button type="primary" onClick={handleSearch}>
            검색
          </Button>

          <Button onClick={searchReset}>초기화</Button>
        </Space>
      </div>

      <Table<UserInfo>
        rowKey="seq"
        dataSource={userList}
        columns={columns}
        loading={loading}
        pagination={{
          current: pageNo,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: (page, size) => {
            setPageNo(page);
            setPageSize(size);
          },
        }}
      />

      {/* 회원 상태 변경 Modal */}
      <Modal
        title="회원 상태 변경"
        open={isStatusModalOpen}
        onCancel={closeStatusModal}
        footer={[
          <Button
            key="cancel"
            onClick={closeStatusModal}
          >
            취소
          </Button>,

          <Button
            key="save"
            type="primary"
            onClick={updateUserStatus}
          >
            저장
          </Button>,
        ]}
      >
        <div className="admin-user-status-modal">
          <div className="admin-user-status-modal__field">
            <span className="admin-user-status-modal__label">
              회원 아이디
            </span>

            <strong>{selectedUser?.id}</strong>
          </div>

          <div className="admin-user-status-modal__field">
            <label
              className="admin-user-status-modal__label"
              htmlFor="userStatus"
            >
              회원 상태
            </label>

            <Select
              id="userStatus"
              value={selectedStatus}
              style={{ width: "100%" }}
              onChange={(value) => setSelectedStatus(value)}
              options={[
                {
                  value: "A",
                  label: "활동",
                },
                {
                  value: "S",
                  label: "정지",
                },
                {
                  value: "D",
                  label: "휴면",
                },
                {
                  value: "L",
                  label: "잠금",
                },
                {
                  value: "R",
                  label: "탈퇴",
                },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserList;