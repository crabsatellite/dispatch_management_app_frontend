import {Card, Result, Image } from "antd";

const PackageInformationStep = () => {
  return (<Card
            title="PACKAGE INFORMATION"
            style={{width: 1000, left: 20}}
          >
          
          <Image className="image" width={200} src={"./box.png"}/>
  </Card>
  );
};

export default PackageInformationStep;