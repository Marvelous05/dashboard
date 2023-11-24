"use client";
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography,Space, Tag } from "antd";
import { Button } from 'react-bootstrap';
import Navbar from "../navbar/page.js"
import "../globals.css"


const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
        technician: '',
        supervisor: 'Nickson',
        type: 'New instastallaion',
        status: 'on it',
        tags: ['done'],
        stock: '2',
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Tasks = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      technician: "",
      supervisor: "",
      type: "",
      status: "",
      stock: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      technician: 'Cosmasss',
        supervisor: 'Cosmas',
        type: 'rework',
        status: 'on it',
        stock: '2',
        tags: ['nice', 'developer'],
    },
    // { key:'1'
    //     technician: 'Cosmas',
    //     supervisor: 'Nickson',
    //     type: 'new instastallaion',
    //     status: 'on it',
    //     stock: '2',
    // },
]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const handleAdd = () => {
    const newData = {
        key: count,
        technician: 'Cosmas',
        supervisor: 'Nickson',
        type: 'new instastallaion',
        status: 'on it',
        tags: ['loser'],
        stock: '2',
        

    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const columns = [
    {
      title: "TECHNICIAN",
      dataIndex: "technician",
      width: "25%",
      editable: true,
    },
    {
      title: "Supervisor",
      dataIndex: "Supervisor",
      width: "25%",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "Type",
      width: "20%",
      editable: true,
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
          <>
            {tags && tags .map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'blue';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    {
        title: "Stock",
        dataIndex: "Stock",
        width: "20%",
        editable: true,
      },
    {
      title: "edit",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "delete",
      dataIndex: "delete",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const App = () => <Table columns={columns} dataSource={data} />;
  return (
    <>
    <Navbar/>
      <div className="flex h-screen">
        
        <div className=" w-4/5 ml-40 ">
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
            <Button
              onClick={handleAdd}
              type="submit"
              style={{
                marginBottom: 16,
              }}
              className="bg-blue-500"
            >
              ADD ROW
              <newForm/> 
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Tasks;
