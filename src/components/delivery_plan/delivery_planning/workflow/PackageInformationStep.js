/**
 * Copyright (c) 2023
 *
 * @summary Implementation of PackageInformationStep
 * @author Catherine Zhou
 * @date 2023-05-09
 *  
 */

// Project imports
import { showError } from "../../../../utils/dialog_utils";

// React imports
import { useState } from "react";

// Antd imports
import { Form, Button, Input, Card, Image, Space, Typography } from "antd";
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;
const PackageInformationStep = ({ packageInfoDrafted, setPackageInfoDrafted, packageInfo, setPackageInfo}) => {

  const [form, setForm] = useState();

  const handleSavePackageInfo = () => {

    let errorMsg = [];
    errorMsg.push("Missed Field :  ");
    if (form.getFieldValue("senderFirstName") === undefined || form.getFieldValue("firstName") === "") {
      errorMsg.push("Sender First Name");
    }
    if (form.getFieldValue("senderLastName") === undefined || form.getFieldValue("firstName") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Sender Last Name");
    }
    if (form.getFieldValue("receiverFirstName") === undefined || form.getFieldValue("firstName") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Receiver First Name");
    }
    if (form.getFieldValue("receiverLastName") === undefined || form.getFieldValue("firstName") === "") {
      if (errorMsg.length >= 2) {
        errorMsg.push(" , ");
      }
      errorMsg.push("Receiver Last Name");
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
      ...{"senderFirstName": form.getFieldValue("senderFirstName")},
      ...{"senderLastName": form.getFieldValue("senderLastName")},
      ...{"receiverFirstName": form.getFieldValue("receiverFirstName")},
      ...{"receiverLastName": form.getFieldValue("receiverLastName")},
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
    <Card title="PACKAGE INFORMATION" style={{ width: 1000, left: 20 }}>
      <Form ref={ref => setForm(ref)}>
        <Title level={5} style={{ textAlign: "left" }}>
          Sender's Information:
        </Title>
        <Space style={{ textAlign: "left" }}>
           <Form.Item
            style={{ width: 350 }}
            name="senderFirstName"
            label="First Name:"
            initialValue={packageInfo.senderFirstName}
          >
            <Input disabled={packageInfoDrafted} />
          </Form.Item>
          <Form.Item
            style={{ width: 350 }}
            label="Last Name:"
            name="senderLastName"
            initialValue={packageInfo.senderLastName}
          >
            <Input disabled={packageInfoDrafted} />
          </Form.Item>
        </Space>
        <Title level={5} style={{ textAlign: "left" }}>
          Receiver's Information:
        </Title>
        <Space style={{ textAlign: "left" }}>
           <Form.Item
            style={{ width: 350 }}
            name="receiverFirstName"
            label="First Name:"
            initialValue={packageInfo.receiverFirstName}
          >
            <Input disabled={packageInfoDrafted} />
          </Form.Item>
          <Form.Item
            style={{ width: 350 }}
            label="Last Name:"
            name="receiverLastName"
            initialValue={packageInfo.receiverLastName}
          >
            <Input disabled={packageInfoDrafted} />
          </Form.Item>
        </Space>
        <Space>
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
        </Space>
        <Space>
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
        </Space>
        <Form.Item>
          {renderButton()}
        </Form.Item>
      </Form>
      <Image preview={false} className="image" width={200} src={"./box.png"} />
    </Card>
  );
};

export default PackageInformationStep;
