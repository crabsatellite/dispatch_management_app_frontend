import React from "react";
import { Carousel, Row, Col, Space, Typography, Button, Image } from "antd";

const { Title, Text } = Typography;

const HomePage = ({ setNavigationKey }) => {
  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Carousel autoplay>
          <div align="center">
            <Image src="./tech.jpeg" />
          </div>
          <div align="center">
            <Image src="./robot_delivery.webp" />
          </div>
          <div align="center">
            <Image src="./drone_delivery.jpeg" />
          </div>
          <div align="center">
            <Image src="./storage.jpeg" />
          </div>
        </Carousel>
        <Row justify="space-around">
          <Col span={6}>
            <Title level={3}>Step-by-step shipping guidance</Title>
            <Col span={17}>
              <Text style={{ color: "grey" }}>
                We provide a easy-to-follow shipping process, from filling your
                information to tracking your package - by text, symbols, and
                pictures.
              </Text>
            </Col>
          </Col>
          <Col span={6}>
            <Title level={3}>An experienced delivery journey</Title>
            <Col span={17}>
              <Text style={{ color: "grey" }}>
                For your shipment, you can choose either Robot or Air Drone to
                pick up your package. Staying at home, let tech work for us.
              </Text>
            </Col>
          </Col>
          <Col span={6}>
            <Title level={3}>Specialized customer service</Title>
            <Col span={17}>
              <Text style={{ color: "grey" }}>
                New Members get 24/7 access to specially trained Support agents
                who can help with everything from account issues to billing
                support.
              </Text>
            </Col>
          </Col>
        </Row>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <Text strong>Ready to Get Started?</Text>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ background: "#394867", color: "white", fontWeight: 2 }}
            onClick={(e) => {
              {
                setNavigationKey(`2`);
              }
            }}
          >
            Order Now
          </Button>
        </div>
      </Space>
    </>
  );
};

export default HomePage;
