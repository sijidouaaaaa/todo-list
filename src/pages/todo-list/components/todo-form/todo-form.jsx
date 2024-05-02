import React from 'react';
import { Form, Input, Button, message, Row } from 'antd';
const FormItem = Form.Item


function TodoForm({ onAddTodo }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const newTodo = { ...values, id: Date.now(), completed: false, }; // 使用当前时间戳作为id  
    onAddTodo(newTodo);
    message.success('新增成功');

  };

  return (
    <Form form={form} name="todoForm" onFinish={handleFinish}>
      <Row>
        <FormItem name="text" label="Todo" rules={[{ required: true, message: '请输入文本!' }]}>
          <Input allowClear />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className='m-l'>
            Add Todo
          </Button>
        </FormItem>
      </Row>

    </Form>
  )
}

export default TodoForm;