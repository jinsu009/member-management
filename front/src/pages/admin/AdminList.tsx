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

import "@/assets/css/admin/AdminList.css";
import "./AdminListPage.css";

interface AdminInfo {
  seq: number;
  id: string;
  name: string;
  authLevel: string;
  status: string;
  lastLoginDt: string;
  regDt: string;
  modDt: string;
  useYn: string;
}

interface NewAdminInfo {
  id: string;
  pw: string;
  name: string;
  authLevel: string;
}

function AdminList() {
  const [adminList, setAdminList] = useState<AdminInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [searchType, setSearchType] = useState("id");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [status, setStatus] = useState("");

  /* =========================
     관리자 추가 Modal
  ========================= */

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newAdminInfo, setNewAdminInfo] = useState<NewAdminInfo>({
    id: "",
    pw: "",
    name: "",
    authLevel: "2",
  });

  /* =========================
     관리자 상태 변경 Modal
  ========================= */

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] =
    useState<AdminInfo | null>(null);

  const [selectedStatus, setSelectedStatus] = useState("");

  /* =========================
     상태명
  ========================= */

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "1":
        return "활동";

      case "2":
        return "정지";

      default:
        return "-";
    }
  };

  /* =========================
     관리자 추가
  ========================= */

  const openAddModal = () => {
    setNewAdminInfo({
      id: "",
      pw: "",
      name: "",
      authLevel: "2",
    });

    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);

    setNewAdminInfo({
      id: "",
      pw: "",
      name: "",
      authLevel: "2",
    });
  };

  const insertAdmin = async () => {
    if (!newAdminInfo.id.trim()) {
      alert("관리자 아이디를 입력해주세요.");
      return;
    }

    if (!newAdminInfo.pw.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!newAdminInfo.name.trim()) {
      alert("관리자 이름을 입력해주세요.");
      return;
    }

    if (!newAdminInfo.authLevel) {
      alert("관리자 권한을 선택해주세요.");
      return;
    }

    const param = {
      id: newAdminInfo.id.trim(),
      pw: newAdminInfo.pw,
      name: newAdminInfo.name.trim(),
      authLevel: newAdminInfo.authLevel,

      // 신규 관리자는 기본 활동 상태
      status: "1",
    };

    try {
      const resp = await fetch(
        "http://localhost:8080/admin/ajax/insertAdmin",
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
        alert("관리자가 추가되었습니다.");

        closeAddModal();

        // 등록 후 목록 갱신
        getAdminList();
      } else {
        alert(result.resultMsg ?? "관리자 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("관리자 추가 중 오류 발생 : ", error);
      alert("관리자 추가 중 오류가 발생했습니다.");
    }
  };

  /* =========================
     관리자 상태 변경
  ========================= */

  const openStatusModal = (admin: AdminInfo) => {
    setSelectedAdmin(admin);
    setSelectedStatus(admin.status);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setSelectedAdmin(null);
    setSelectedStatus("");
    setIsStatusModalOpen(false);
  };

  const updateAdminStatus = async () => {
    if (!selectedAdmin) {
      return;
    }

    if (!selectedStatus) {
      alert("변경할 상태를 선택해주세요.");
      return;
    }

    const param = {
      seq: selectedAdmin.seq,
      status: selectedStatus,
    };

    try {
      const resp = await fetch(
        "http://localhost:8080/admin/ajax/updateAdminStatus",
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
        alert("관리자 상태가 변경되었습니다.");

        closeStatusModal();

        // 상태 변경 후 목록 갱신
        getAdminList();
      } else {
        alert(result.resultMsg ?? "관리자 상태 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("관리자 상태 변경 중 오류 발생 : ", error);
      alert("관리자 상태 변경 중 오류가 발생했습니다.");
    }
  };

  /* =========================
     Table
  ========================= */

  const columns: TableColumnsType<AdminInfo> = [
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

      // 아이디 클릭 → 상태 변경
      render: (id: string, record: AdminInfo) => (
        <button
          type="button"
          className="admin-list-page__id-button"
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
      title: "권한",
      dataIndex: "authLevel",
      key: "authLevel",
      render: (authLevel: string) => {
        switch (authLevel) {
          case "1":
            return "최고 관리자";

          case "2":
            return "일반 관리자";

          default:
            return "-";
        }
      },
    },
    {
      title: "마지막 로그인",
      dataIndex: "lastLoginDt",
      key: "lastLoginDt",
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

  /* =========================
     목록 조회
  ========================= */

  const getAdminList = async () => {
    setLoading(true);

    try {
      const resp = await fetch(
        "http://localhost:8080/admin/ajax/getAdminList",
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

      setAdminList(result.adminInfoList ?? []);
      setTotal(result.total ?? 0);
    } catch (error) {
      console.error("관리자 목록 조회 중 오류 발생 : ", error);
      setAdminList([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     검색
  ========================= */

  const handleSearch = () => {
    if (pageNo === 1) {
      getAdminList();
    } else {
      setPageNo(1);
    }
  };

  const searchReset = () => {
    setSearchType("id");
    setSearchKeyword("");
    setStatus("");

    if (pageNo === 1) {
      setTimeout(() => {
        getAdminList();
      }, 0);
    } else {
      setPageNo(1);
    }
  };

  useEffect(() => {
    getAdminList();
  }, [pageNo, pageSize]);

  return (
    <div className="admin-list">
      {/* 제목 + 관리자 추가 */}
      <div className="admin-list-page__header">
        <h2 className="admin-list__title">관리자 관리</h2>

        <Button type="primary" onClick={openAddModal}>
          관리자 추가
        </Button>
      </div>

      {/* 검색 */}
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
                value: "1",
                label: "활동",
              },
              {
                value: "2",
                label: "정지",
              },
            ]}
          />

          <Button type="primary" onClick={handleSearch}>
            검색
          </Button>

          <Button onClick={searchReset}>
            초기화
          </Button>
        </Space>
      </div>

      {/* 목록 */}
      <Table<AdminInfo>
        rowKey="seq"
        dataSource={adminList}
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

      {/* =========================
          관리자 추가 Modal
      ========================= */}

      <Modal
        title="관리자 추가"
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={[
          <Button
            key="cancel"
            onClick={closeAddModal}
          >
            취소
          </Button>,

          <Button
            key="save"
            type="primary"
            onClick={insertAdmin}
          >
            저장
          </Button>,
        ]}
      >
        <div className="admin-add-modal">
          <div className="admin-add-modal__field">
            <label htmlFor="adminId">
              아이디
            </label>

            <Input
              id="adminId"
              value={newAdminInfo.id}
              placeholder="관리자 아이디를 입력해주세요."
              onChange={(e) =>
                setNewAdminInfo((prev) => ({
                  ...prev,
                  id: e.target.value,
                }))
              }
            />
          </div>

          <div className="admin-add-modal__field">
            <label htmlFor="adminPw">
              비밀번호
            </label>

            <Input.Password
              id="adminPw"
              value={newAdminInfo.pw}
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) =>
                setNewAdminInfo((prev) => ({
                  ...prev,
                  pw: e.target.value,
                }))
              }
            />
          </div>

          <div className="admin-add-modal__field">
            <label htmlFor="adminName">
              이름
            </label>

            <Input
              id="adminName"
              value={newAdminInfo.name}
              placeholder="관리자 이름을 입력해주세요."
              onChange={(e) =>
                setNewAdminInfo((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className="admin-add-modal__field">
            <label htmlFor="authLevel">
              관리자 권한
            </label>

            <Select
              id="authLevel"
              value={newAdminInfo.authLevel}
              style={{ width: "100%" }}
              onChange={(value) =>
                setNewAdminInfo((prev) => ({
                  ...prev,
                  authLevel: value,
                }))
              }
              options={[
                {
                  value: "1",
                  label: "최고 관리자",
                },
                {
                  value: "2",
                  label: "일반 관리자",
                },
              ]}
            />
          </div>
        </div>
      </Modal>

      {/* =========================
          관리자 상태 변경 Modal
      ========================= */}

      <Modal
        title="관리자 상태 변경"
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
            onClick={updateAdminStatus}
          >
            저장
          </Button>,
        ]}
      >
        <div className="admin-status-modal">
          <div className="admin-status-modal__field">
            <span className="admin-status-modal__label">
              관리자 아이디
            </span>

            <strong>{selectedAdmin?.id}</strong>
          </div>

          <div className="admin-status-modal__field">
            <label
              className="admin-status-modal__label"
              htmlFor="adminStatus"
            >
              관리자 상태
            </label>

            <Select
              id="adminStatus"
              value={selectedStatus}
              style={{ width: "100%" }}
              onChange={(value) =>
                setSelectedStatus(value)
              }
              options={[
                {
                  value: "1",
                  label: "활동",
                },
                {
                  value: "2",
                  label: "정지",
                },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminList;