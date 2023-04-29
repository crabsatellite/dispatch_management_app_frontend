import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import SignupButton from "./SignupButton";
import { login } from "../../utils/backend_utils";

const LoginForm = ({ setAuthed }) => {

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {

      await login(data);
      setAuthed(true);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 500, margin: "20px auto" }}>
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            disabled={loading}
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password disabled={loading} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
          <UsergroupAddOutlined /> <SignupButton />
        </Form.Item>
      </Form>
      <p>TODO: The form opens for refactoring...</p>
    </div>
  );
};

export default LoginForm;