import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  
} from 'antd';
const newForm = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      
      <Form.Item label="Technician">
        <Input />
      </Form.Item>
      <Form.Item label="Supervisor">
        <Input />
      </Form.Item>
      <Form.Item label="Type">
        <Input />
      </Form.Item>
      <Form.Item label="Status">
        <Select>
          <Select.Option value="demo">On It</Select.Option>
          <Select.Option value="demo">On Hold</Select.Option>
          <Select.Option value="demo">Done</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Submit">
        <Button>Submit</Button>
      </Form.Item>
    </Form>
  );
};
export default newForm;