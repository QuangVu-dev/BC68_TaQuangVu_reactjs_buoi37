import React from "react";
import { Space, Table, Tag } from "antd";

const TableSinhVien = ({ arrSinhVien, handleDelete, handleGetSinhVien }) => {
  const columns = [
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "name",
    },
    {
      title: "Họ tên",
      dataIndex: "tenSinhVien",
      key: "age",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "address",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                handleDelete(record.mssv);
              }}
              className="py-2 px-5 bg-red-500 rounded-md"
            >
              Xoá
            </button>
            <button
              onClick={() => {
                handleGetSinhVien(record);
              }}
              className="py-2 px-5 bg-yellow-500 rounded-md ml-3"
            >
              Sửa
            </button>
          </>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={arrSinhVien} />;
};

export default TableSinhVien;
