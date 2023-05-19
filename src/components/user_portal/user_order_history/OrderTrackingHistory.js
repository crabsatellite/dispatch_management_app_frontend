/**
 * Copyright (c) 2023
 *
 * @summary Implementation of OrderTrackingHistory
 * @author Zilin Li
 * @date 2023-05-19  
 *  
 */

// Project imports
import { showError } from "../../../utils/dialog_utils";
import { getDelivery } from "../../../utils/backend_utils";
import DeliveryOrderDetailButton from "./DeliveryOrderDetailButton";

// Antd imports
import { Button, Result, Image, Typography, Row, Space, List, Card, Descriptions } from "antd";
import { RollbackOutlined, LoadingOutlined } from '@ant-design/icons';

// React imports
import { useEffect, useState } from "react";

const { Text } = Typography;
const OrderTrackingHistory = ({setViewOrderTrackingHistory}) => {


    const [loading, setLoading] = useState(false);
    const [deliveryData, setDeliveryData] = useState();

    const handleGetDelivery = async () => {
        setLoading(true);
        try {
          const credential = {
            limit: 10,
            offset: 0, 
            sort: "deliveryDate:desc",
          }
          const data = await getDelivery(credential);
          setDeliveryData(data);
          console.log(deliveryData);
        } catch (error) {
          showError("Error!", "Fail to get delivery order history data . ");
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        handleGetDelivery();
    }, []);

    const renderContent = () => {
        
        if (loading) {
            return <Row style={{backgroundColor: '#364d79'}}>
                        <Space direction="vertical" align="center">
                            <Result
                                icon={<Image preview={false} width={270} src={"./loading-bar.png"}/>}
                                title={<Text style={{ fontSize: 30, color: "white" }}>
                                    Your delivery order history data is loading ... 
                                    </Text>}
                                style={{marginLeft: 700}}
                                />
                        <LoadingOutlined style={{fontSize: 70, marginLeft: 700}}/>
                        </Space>
                    </Row>;

        } else if (deliveryData !== null && deliveryData !== undefined && deliveryData.length >= 1) {
            return <Card title="Delivery Order History">
                        <List
                        itemLayout="horizontal"
                        dataSource={deliveryData}
                        renderItem={(delivery, index) => (
                            <Card
                                key={index}
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                            Delivery Order {index + 1}
                                        </Text>
                                        <DeliveryOrderDetailButton delivery={delivery}/>
                                    </div>
                                }
                            >
                                <Descriptions>
                                    <Descriptions.Item label="Delivery Date">{delivery.deliveryInfo.deliveryDate}</Descriptions.Item>
                                    <Descriptions.Item label="Delivery Status">{delivery.deliveryStatus.status}</Descriptions.Item>
                                    <Descriptions.Item label="Receiver Name">{delivery.deliveryInfo.receiverName}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        )}
                        />
                    </Card>;
        } else {
            return <Row style={{backgroundColor: '#364d79'}}>
                        <Result
                            icon={<Image preview={false} width={350} src={"./empty.png"}/>}
                            title={<Text style={{ fontSize: 30, color: "white" }}>
                                        You don't have any delivery order for now ... 
                                        </Text>}
                                style={{marginLeft: 700}}
                        />
                    </Row>;
        }
    }   
    
    return (<div>
                {renderContent()}
                <Row>
                    <Button style={{marginTop: 50}} icon={<RollbackOutlined />} type="primary" onClick={() => setViewOrderTrackingHistory(false)}>Main Portal</Button>    
                </Row>
            </div>);
};

export default OrderTrackingHistory;