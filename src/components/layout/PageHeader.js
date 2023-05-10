/**
 * Copyright (c) 2023
 *
 * @summary Implementation of index.js
 * @author 202302 Flag Camp Team03
 * @date 2023-04-28  
 *  
 */

// Antd imports
import { Layout, Menu, Row, Col } from "antd";
import { UserOutlined, ReadOutlined, CompassOutlined } from "@ant-design/icons";

const navigationItems = [
  { key: "1", label: `Home`, icon: <ReadOutlined /> },
  { key: "2", label: `Delivery Plan `, icon: <CompassOutlined /> },
  { key: "3", label: `User Portal`, icon: <UserOutlined /> },
];

const { Header } = Layout;

const PageHeader = ({ navigationKey, setNavigationKey }) => {
  return (
    <Header style={{ backgroundColor: "white" }}>
      <Row justify="space-between">
        <Col>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#364d79" }}>
            Dispatch Management App
          </div>
        </Col>
        <Col>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            <Menu
              style={{ backgroundColor: "white" }}
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={[navigationKey]}
              items={navigationItems}
              onClick={(e) => setNavigationKey(e.key)}
            />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
