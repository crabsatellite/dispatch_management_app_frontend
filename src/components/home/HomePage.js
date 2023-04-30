
import React from 'react';
import { Carousel, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const contentStyle = {
    margin: 0,
    height: '450px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const HomePage = () => {
    return (
        <>
            <Carousel 
                dots={true}
                arrows={true}
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
            >
                <div>
                    <h3 style={contentStyle}>Image 1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Image 2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Image 3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Image 4</h3>
                </div>
            </Carousel>


            <Row>
                <Col span={8}>
                    Hello
                </Col>


                <Col span={8}>
                    World!
                </Col>

                <Col span={8}>
                    App
                </Col>
            </Row>
        </>
        
      );
};

export default HomePage; 