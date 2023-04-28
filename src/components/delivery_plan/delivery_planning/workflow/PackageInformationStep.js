import { Card, Image } from "antd";
import { DELIVERY_STATE } from "./../../../../utils/delivery_plan_utils"

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