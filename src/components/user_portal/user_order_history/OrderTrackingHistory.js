/**
 * Copyright (c) 2023
 *
 * @summary <description>
 * @author <author>
 * @date Year-Month-Day  
 *  
 */

// Project imports
import { FRONTEND_COURIER_NAME, FRONTEND_WAREHOUSE_NAME } from "../../../utils/delivery_plan_utils";
// Antd imports
import { Button } from "antd";
import { RollbackOutlined } from '@ant-design/icons';

// React imports
import { useEffect } from "react";

let mockData = {};
const OrderTrackingHistory = ({setViewOrderTrackingHistory}) => {

    useEffect(() => {

        /* 1st way: developer can run through the entire delivery planning workflow in order to get the mock data
           2nd way: developer can set the mock data here directly, e.g.

            mockData = {
                "deliveryInfo": {
                    "deliveryDate": "2023-05-16",
                    "senderName": "John Doe",
                    "senderAddress":"123 Main St, New York, NY, 10001, USA",
                    "receiverName": "Smith Doe",
                    "receiverAddress":"123 Main St, New York, NY, 10001, USA",
                    "receiverEmail":"dummy@dummy.com",
                    "receiverPhoneNumber":"123-456-7890",
                    "warehouseId": "2",
                    "courierId": "1",
                    "pickUpSpeed": "priority",
                    "deliverySpeed": "first_class"
                },
                "deliveryStatus": {
                    "status": "delivery_finished"
                },
                "location": {
                    "latitude": "40.74",
                    "longitude": "70.59"
                },
                "deliveryItem": {
                    "items": [
                        {
                            "name": "item1",
                            "quantity": "12"
                        }
                    ]
                }
            }
            const json = JSON.stringify(mockData);
            localStorage.setItem("mock_data", json);
        */

        const json = localStorage.getItem("mock_data");
        if (json === undefined || json === null) {
            return;
        }
        mockData = JSON.parse(json);
        console.log(mockData.deliveryInfo);
        console.log(mockData.deliveryStatus);
        console.log(mockData.deliveryItem);
        console.log(mockData.location);
    }, []);
    
    return (<div>
                <Button icon={<RollbackOutlined />} type="primary" onClick={() => setViewOrderTrackingHistory(false)}>Return</Button>    
            </div>);
};

export default OrderTrackingHistory;