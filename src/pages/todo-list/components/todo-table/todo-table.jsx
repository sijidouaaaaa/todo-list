// TodoList.js
import React, { useState } from "react";
import { Form, Table, Modal, Typography, Select, Input, Popconfirm } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;
const TypographyLink = Typography.Link;
const FormItem =Form.Item;

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
  const inputNode = inputType === 'boolean' ? <Select
    options={[
      { value: false, label: '未完成' },
      { value: true, label: '已完成' },
    ]}
  /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <FormItem
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请选择 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};

function TodoTable({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onSetTodos,
}) {
  const columns = [
    {
      title: "Todo",
      dataIndex: "text",
      key: "text",
      editable: true,
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      editable: true,
      render: (completed) => <span>{completed ? "已完成" : "未完成"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <TypographyLink
              onClick={() => handleSaveEditTodo(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </TypographyLink>
            <Popconfirm title="Sure to cancel?" onConfirm={handleCancelEditTodo}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <TypographyLink className="m-r" disabled={editingKey !== ''} onClick={() => handleEditTodo(record)}>
              编辑
            </TypographyLink>
            <TypographyLink onClick={() => handleToggle(record)} className="m-r">
              {record.completed ? "未完成" : "已完成"}
            </TypographyLink>
            <TypographyLink onClick={() => handleDelete(record)}>删除</TypographyLink>
          </span>

        );

      }
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
        inputType: col.dataIndex === 'completed' ? 'boolean' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const dataSource = todos;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;

  // 切换完成的状态
  const handleToggle = (record) => {
    onToggleTodo(record.id);
  };
  // 删除
  const handleDelete = (record) => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleFilled />,
      content: '你确定删除这个todolist吗',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 调用父组件的删除方法;
        onDeleteTodo(record.id);
      },
      onCancel() {
      },
    });
  };
  // 编辑
  const handleEditTodo = (record) => {
    form.setFieldsValue({
      text: '',
      completed: false,
      ...record,
    });
    setEditingKey(record.id);
  };
  // 取消todolist的编辑
  const handleCancelEditTodo = () => {
    setEditingKey('');
  };
  // 保存
  const handleSaveEditTodo = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // 保存新数据，并清空需要更改的行id
        onSetTodos(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        onSetTodos(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          columns={mergedColumns}
          dataSource={dataSource}
          rowKey={"id"}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={{
            onChange: handleCancelEditTodo,
          }}
        />
      </Form>

    </div>
  );
}

export default TodoTable;
