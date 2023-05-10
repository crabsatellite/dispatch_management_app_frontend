/**
 * Copyright (c) 2023
 *
 * @summary Implementation of LoginForm
 * @author 202302 Flag Camp Team03
 * @date 2023-05-09
 *  
 */

// Project imports
import SignupForm from "./SignupForm";
import { login } from "../../utils/backend_utils";

// React imports
import React, { useState } from "react";

// Antd imports
import { Form, Button, Input, message } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";

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
          <UsergroupAddOutlined /> <SignupForm />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;