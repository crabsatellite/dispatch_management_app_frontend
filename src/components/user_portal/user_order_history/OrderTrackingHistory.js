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
                userId: 1,
                deliveryDate: "2023-04-29T12:00:00.000Z",
                senderAddress: {
                    name: "John Doe",
                    street: "123 Main St, New York, NY, 10001, USA",
                },
                recipientAddress: {
                    name: "Jane Smith",
                    email: : "dummy@dummy.com",
                    phoneNumber: "123-456-7890",
                    street: "456 Elm St, Los Angeles, CA, 90001, USA",
                },
                items: [
                    {
                        name: "Item 1",
                        quantity: 2
                    }
                ],
                status: "delivery_finished",
                warehouseId: "2",
                courierId: "1",
                pickupSpeed: "priority"
                deliverSpeed: "first_class"
                courierLastPositionLat: 40.74
                courierLastPositionLng: 70.59

            const json = JSON.stringify(mockData);
            localStorage.setItem("mock_data", json);
        */

        const json = localStorage.getItem("mock_data");
        if (json === undefined || json === null) {
            return;
        }
        mockData = JSON.parse(json);
        console.log(mockData.userId);
        console.log(mockData.deliveryDate);
        console.log(mockData.senderAddress.name);
        console.log(mockData.senderAddress.street);
        console.log(mockData.recipientAddress.name);
        console.log(mockData.recipientAddress.street);
        console.log(mockData.items[0].name);
        console.log(mockData.items[0].quantity);
        console.log(mockData.status);
        console.log(FRONTEND_WAREHOUSE_NAME[mockData.warehouseId].toLowerCase());
        console.log(FRONTEND_COURIER_NAME[mockData.courierId].toLowerCase());
        console.log(mockData.pickupSpeed);
        console.log(mockData.deliverSpeed);
        console.log(mockData.courierLastPositionLat);
        console.log(mockData.courierLastPositionLng);
    }, []);
    
    return (<div>
                <Button icon={<RollbackOutlined />} type="primary" onClick={() => setViewOrderTrackingHistory(false)}>Return</Button>    
            </div>);
};

export default OrderTrackingHistory;