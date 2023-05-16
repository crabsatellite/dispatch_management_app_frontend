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
import { login } from "../../../utils/backend_utils";
import { showSuccess, showError } from "../../../utils/dialog_utils";

// React imports
import React, { useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

// Antd imports
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Image,
  Space,
  Modal,
  Typography,
} from "antd";
import {
  UserOutlined,
  UsergroupAddOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const LoginForm = ({ setAuthed }) => {
  const [player, setPlayer] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {

    let errorMsg = [];
    errorMsg.push("Missed Field :  ");
    if (data.username === undefined || data.username === "") {
      errorMsg.push("Username");
    }
    if (data.password === undefined || data.password === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Password");
    }
    errorMsg.push(" . ");
    if (errorMsg.length > 2) {
      showError("Error!", errorMsg);
      return;
    }
    setLoading(true);

    try {
      const response = await login(data);
      localStorage.setItem("token", response.token);
      setAuthed(true);
      showSuccess("Success", "Login successfully ! ");
    } catch (error) {
      showError("Error!", "Fail to login . Double check your username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Delivery Plan Workflow Tutorial Demo"
        visible={showVideo}
        footer={null}
        onCancel={() => setShowVideo(false)}
        afterClose={() => player.pause()}
        bodyStyle={{ padding: 0 }}
      >
        <Player autoPlay ref={(ref) => setPlayer(ref)}>
          <source src="./demo.mp4" />
        </Player>
      </Modal>
      <Row>
        <Col span={12}>
          <Image
            preview={false}
            width={1300}
            height={800}
            src={"./robot_drone_login.jpg"}
          />
        </Col>
        <Col span={12}>
          <Space
            direction="vertical"
            align="center"
            style={{ marginLeft: 400 }}
          >
            <Image preview={false} width={200} height={200} src={"./key.png"} />
            <div style={{ width: 500, margin: "20px auto" }}>
              <Form onFinish={handleFormSubmit}>
                <Form.Item
                  name="username"
                >
                  <Input
                    disabled={loading}
                    prefix={<UserOutlined />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
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
            <Image
              preview={false}
              width={100}
              height={100}
              src={"./video.png"}
            />
            <Button
              icon={<PlayCircleOutlined />}
              type="primary"
              onClick={() => setShowVideo(true)}
            >
              Play Demo
            </Button>
            <Text style={{ fontSize: 15, color: "grey" }}>
              First time here? We provide a tutorial demo on our delivery plan
              workflow .
            </Text>
          </Space>
        </Col>
      </Row>
    </>
  );
};
export default LoginForm;
