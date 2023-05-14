import { Card, Image, Space } from "antd";
import React, { useState } from "react";
import { Form, Button, Input, message, Typography } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { login } from "../../../../utils/backend_utils";

const { Title } = Typography;

const PackageInformationStep = ({ deliveryState }) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {
      await login(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="PACKAGE INFORMATION" style={{ width: 800, left: 20 }}>
      <Form onFinish={handleFormSubmit}>
        <Title level={5} style={{ textAlign: "left" }}>
          Sender's Information:
        </Title>
        <Space style={{ textAlign: "left" }}>
          <Form.Item
            style={{ width: 350 }}
            label="First Name:"
            rules={[
              {
                required: true,
                message: "Please input First Name!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
          <Form.Item
            style={{ width: 350 }}
            label="Last Name:"
            rules={[
              {
                required: true,
                message: "Please input Last Name!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Space>
        <Title level={5} style={{ textAlign: "left" }}>
          Receiver's Information:
        </Title>
        <Space style={{ textAlign: "left" }}>
          <Form.Item
            style={{ width: 350 }}
            label="First Name:"
            rules={[
              {
                required: true,
                message: "Please input First Name!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
          <Form.Item
            style={{ width: 350 }}
            label="Last Name:"
            rules={[
              {
                required: true,
                message: "Please input Last Name!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item
            style={{ width: 350 }}
            label="Phone Number:"
            rules={[
              {
                required: true,
                message: "Please input Contact!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
          <Form.Item
            style={{ width: 350 }}
            label="Email:"
            rules={[
              {
                required: true,
                message: "Please input Email!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item
            style={{ width: 350 }}
            label="Content:"
            rules={[
              {
                required: true,
                message: "Please input Content!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
          <Form.Item
            style={{ width: 350 }}
            label="Weight:"
            rules={[
              {
                required: true,
                message: "Please input Weight!",
              },
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Space>
        <Form.Item
          label="Shipping Address:"
          rules={[
            {
              required: true,
              message: "Please input Shipping Address!",
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "40%" }}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
      <Image className="image" width={200} src={"./box.png"} />
    </Card>
  );
};

export default PackageInformationStep;
