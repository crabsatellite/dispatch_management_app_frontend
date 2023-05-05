/**
 * Copyright (c) 2023
 *
 * @summary <description>
 * @author <author>
 * @date Year-Month-Day  
 *  
 */

// Project imports
import { DELIVERY_STATE } from "./../../../../utils/delivery_plan_utils"

// Antd imports
import { Card, Image } from "antd";

const PackageInformationStep = ({deliveryState}) => {
  return (
    <Card
      title="PACKAGE INFORMATION"
      style={{width: 1000, left: 20}}
    >
      {deliveryState === DELIVERY_STATE.DELIVER_INITIALIZATION 
       || deliveryState === DELIVERY_STATE.DELIVER_PROCESSING 
       || deliveryState === DELIVERY_STATE.DELIVER_FINISHED? 
        <div>N/A</div> : <div>Placeholder: User enters package information here......</div>
      }
      <Image className="image" width={200} src={"./box.png"}/>
    </Card>
  );
};

export default PackageInformationStep;