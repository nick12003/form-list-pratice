import React from "react";
import { Table, Popconfirm, Button } from "antd";

const MyTable = ({
  data,
  onEdit,
  onDelete,
  onRowSelection,
  selectedRowKeys
}) => {
  const columns = [
    {
      title: "商品編號",
      dataIndex: "pNo",
      key: "pNo"
    },
    {
      title: "商品名稱",
      dataIndex: "pName",
      key: "pName"
    },
    {
      title: "商品規格",
      dataIndex: "pSpec",
      key: "pSpec"
    },
    {
      title: "商品數量",
      dataIndex: "pQuantity",
      key: "pQuantity"
    },
    {
      title: "商品描述",
      dataIndex: "pDesc",
      key: "pDesc"
    },
    {
      title: "運送方式",
      dataIndex: "pWay",
      key: "pWay",
      render: (text) => (text === "STORE" ? "超商取貨" : "宅配")
    },
    {
      title: "上架日期",
      dataIndex: "pDate",
      key: "pDate",
      render: (text) => text.format("YYYY-MM-DD")
    },
    {
      title: "上架時間",
      dataIndex: "pTime",
      key: "pTime",
      render: (text) => text.format("HH:mm:ss")
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="link" size="small" onClick={() => onEdit(record.key)}>
            編輯
          </Button>
          <Popconfirm title="確認刪除?" onConfirm={() => onDelete(record.key)}>
            <Button type="link" size="small">
              刪除
            </Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default MyTable;
