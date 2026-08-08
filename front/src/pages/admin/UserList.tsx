import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Table,
  type TableColumnsType,
} from "antd";
import "./AdminLogin.css";
import "@/assets/css/admin/AdminList.css";

interface UserInfo {
  seq: number;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDt: string;
  status: number;
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
      render: (status: string) => {
        switch (status) {
          case "A":
            return "정상";
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
      },
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

  async function getUserList() {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:8080/admin/ajax/getUserList", {
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
      });

      const result = await resp.json();

      setUserList(result.userInfoList);
      setTotal(result.total ?? 0);
    } catch (error) {
      console.error("회원 목록 조회 중 오류 발생 : ", error);
      setUserList([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    // 검색할 때는 무조건 1페이지부터
    if (pageNo === 1) {
      getUserList();
    } else {
      setPageNo(1);
    }
  }

  function searchReset() {
    setSearchType("id");
    setSearchKeyword("");
    setStatus("");
    setPageNo(1);
  }

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
                label: "정상",
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
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          onChange: (page, size) => {
            setPageNo(page);
            setPageSize(size);
          },
        }}
      />
    </div>
  );
}

export default UserList;
