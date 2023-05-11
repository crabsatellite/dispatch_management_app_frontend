/**
 * Copyright (c) 2023
 *
 * @summary <description>
 * @author <author>
 * @date Year-Month-Day  
 *  
 */

// Antd imports
import { Button } from "antd";
import { RollbackOutlined } from '@ant-design/icons';

const OrderTrackingHistory = ({setViewOrderTrackingHistory}) => {
    return (<div>
                <Button icon={<RollbackOutlined />} type="primary" onClick={() => setViewOrderTrackingHistory(false)}>Return</Button>    
            </div>);
};

export default OrderTrackingHistory;