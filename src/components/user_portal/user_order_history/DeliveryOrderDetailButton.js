/**
 * Copyright (c) 2023
 *
 * @summary Button for displaying delivery order detail
 * @author Zilin Li
 * @date 2023-05-19  
 *  
 */

// Project imports
import { FRONTEND_COURIER_NAME, FRONTEND_WAREHOUSE_NAME } from "../../../utils/delivery_plan_utils";

// Antd imports
import { Tooltip, Button, Modal, Space, Typography } from "antd";

// React imports
import { useState } from "react";

const { Text } = Typography;
const DeliveryOrderDetailButton = ({delivery}) => {

    const [visible, setVisible] = useState(false);

    return (
        <>
          <Tooltip title="View Delivery Order Details">
            <Button
              onClick={() => setVisible(true)}
              style={{ border: "none", marginLeft: 30}}
              type="primary"
            >
              View Detail
            </Button>
          </Tooltip>
          
            <Modal
              title="Delivery Order Detail"
              centered={true}
              visible={visible}
              footer={[
                <Button key="submit" type="primary" onClick={() => setVisible(false)}>
                    Close
                </Button>,
              ]}
              closable={false}  
            >
                <Space direction="vertical">
                    <Text strong={true}>"Delivery Date"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.deliveryDate}</Text>
                    <Text strong={true}>"Delivery Status"</Text>
                    <Text type="secondary">{delivery.deliveryStatus.status}</Text>
                    
                    <Text strong={true}>"Sender Name"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.senderName}</Text>
                    <Text strong={true}>"Sender Pickup Address"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.senderAddress}</Text>
                    
                    <Text strong={true}>"Receiver Name"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.receiverName}</Text>
                    <Text strong={true}>"Receiver Delivered Address"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.receiverAddress}</Text>
                    <Text strong={true}>"Receiver Phone Number"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.receiverPhoneNumber}</Text>
                    <Text strong={true}>"Receiver Email"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.receiverEmail}</Text>
                
                    <Text strong={true}>"Delivery Speed"</Text>
                    <Text type="secondary">{delivery.deliveryInfo.deliverySpeed}</Text>
                    <Text strong={true}>"Dispatch Warehouse"</Text>
                    <Text type="secondary">{FRONTEND_WAREHOUSE_NAME[delivery.deliveryInfo.warehouseId].toLowerCase()}</Text>
                    <Text strong={true}>"Dispatch Type"</Text>
                    <Text type="secondary">{FRONTEND_COURIER_NAME[delivery.deliveryInfo.courierId].toLowerCase()}</Text>
                    
                    <Text strong={true}>"Package Content"</Text>
                    <Text type="secondary">{delivery.deliveryItems[0].items[0].name}</Text>
                    <Text strong={true}>"Package Weight"</Text>
                    <Text type="secondary">{delivery.deliveryItems[0].items[0].quantity}</Text>
                    
                </Space>
            </Modal>
        </>
      );
}

export default DeliveryOrderDetailButton;