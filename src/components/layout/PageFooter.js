/**
 * Copyright (c) 2023
 *
 * @summary Implementation of index.js
 * @author 202302 Flag Camp Team03
 * @date 2023-04-28  
 *  
 */

// Antd imports 
import { Layout, Col } from "antd";
import { MailOutlined, WechatOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const PageFooter = () => {

    return (
        <Footer style={{textAlign: 'center', backgroundColor: '#364d79'}}>
            <Col>

                <div style={{ color: "white" }}>
                    ©2023 Dispatch Management App. All Rights Reserved. Website Made by 202302 Flag Camp Team03
                </div>
            </Col>
            <Col>
                <Col>
                    <div style={{ color: "white" }}>
                        <WechatOutlined /> Wechat : XXX
                    </div>
                </Col>
                <Col>
                    <div style={{ color: "white" }}>
                        <CustomerServiceOutlined /> Customer Service: XXX-XXX-XXXX
                    </div>
                </Col>
                <Col>
                    <div style={{ color: "white" }}>
                        <MailOutlined /> Mail: XXX@XXX.com
                    </div>
                    
                </Col>
            </Col>
      </Footer>
    );
};

export default PageFooter;

