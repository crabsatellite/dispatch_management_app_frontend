/**
 * Copyright (c) 2023
 *
 * @summary Implementation of PackageInformationStep
 * @author Catherine Zhou
 * @date 2023-05-09
 *  
 */

// Project imports
import { showError, showInfo } from "../../../../utils/dialog_utils";

// React imports
import { useEffect, useState } from "react";

// Antd imports
import { Form, Button, Input, Card, Image } from "antd";
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const PackageInformationStep = ({ packageInfoDrafted, setPackageInfoDrafted, packageInfo, setPackageInfo}) => {

  const [form, setForm] = useState();

  const handleSavePackageInfo = () => {

    let errorMsg = [];
    errorMsg.push("Missed Field :  ");
    if (form.getFieldValue("firstName") === undefined || form.getFieldValue("firstName") === "") {
      errorMsg.push("First Name");
    }
    if (form.getFieldValue("lastName") === undefined || form.getFieldValue("lastName") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Last Name");
    }
    if (form.getFieldValue("phoneNumber") === undefined || form.getFieldValue("phoneNumber") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Phone Number");
    }
    if (form.getFieldValue("email") === undefined || form.getFieldValue("email") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Email");
    }
    if (form.getFieldValue("content") === undefined || form.getFieldValue("content") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Content");
    }
    if (form.getFieldValue("weight") === undefined || form.getFieldValue("weight") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Weight");
    }
    errorMsg.push(" . ");

    if (errorMsg.length > 2) {
      showError("Error!", errorMsg);
      return;
    }
    
    setPackageInfo(packageInfo => ({
      ...packageInfo,
      ...{"firstName": form.getFieldValue("firstName")},
      ...{"lastName": form.getFieldValue("lastName")},
      ...{"phoneNumber": form.getFieldValue("phoneNumber")},
      ...{"email": form.getFieldValue("email")},
      ...{"content": form.getFieldValue("content")},
      ...{"weight": form.getFieldValue("weight")},
    }));
    setPackageInfoDrafted(true);
  }

  const renderButton = () => {

    return packageInfoDrafted ? 
    <Button 
      onClick={() => setPackageInfoDrafted(false)}
      style={{ width: "40%" }}
      icon={<EditOutlined />}
    >
      Modify
    </Button> 
    : 
    <Button 
      type="primary"
      onClick={() => handleSavePackageInfo()}
      style={{ width: "40%" }}
      icon={<SaveOutlined />}
    >
      Save
    </Button>
  }

  return (
    <Card title="PACKAGE INFORMATION" style={{width: 1000, left: 20}}>
      <Form ref={ref => setForm(ref)}>
        <Form.Item
          style={{ width: 350 }}
          name="firstName"
          label="First Name:"
          initialValue={packageInfo.firstName}
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item
          style={{ width: 350 }}
          label="Last Name:"
          name="lastName"
          initialValue={packageInfo.lastName}
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item
          style={{ width: 350 }}
          label="Phone Number:"
          name="phoneNumber"
          initialValue={packageInfo.phoneNumber}
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item
          style={{ width: 350 }}
          label="Email:"
          name="email"
          initialValue={packageInfo.email}
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item
          style={{ width: 350 }}
          label="Content:"
          name="content"
          initialValue={packageInfo.content}
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item
          style={{ width: 350 }}
          label="Weight:"
          name="weight"
          initialValue={packageInfo.weight}
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item
          label="Shipping Address:"
          name="shippingAddress"
        >
          <Input disabled={packageInfoDrafted} />
        </Form.Item>
        <Form.Item>
          {renderButton()}
        </Form.Item>
      </Form>
      <Image className="image" width={200} src={"./box.png"} />
    </Card>
  );
};

export default PackageInformationStep;
