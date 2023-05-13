/**
 * Copyright (c) 2023
 *
 * @summary Implementation of SignupButton
 * @author 202302 Flag Camp Team03
 * @date 2023-05-09
 *  
 */

// Project imports
import { register } from "../../../utils/backend_utils";
import { showSuccess, showError } from "../../../utils/dialog_utils";

// Antd imports
import { Button, Modal, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

// React imports
import { useState } from "react";

const SignupButton = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterOnClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {
      await register(data);
      showSuccess("Success", "Sign up successfully ! ");
      setModalVisible(false);
    } catch (error) {
      showError("Error!", "Fail to sign up . ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="link"
        style={{ padding: 0 }}
        onClick={handleRegisterOnClick}
      >
        Signup Now !  
      </Button>
      <Modal
        title="Sign Up"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
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
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignupButton;
