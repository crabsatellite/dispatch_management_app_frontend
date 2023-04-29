import { Layout } from "antd";
import HomePage from "./HomePage";
import { useState } from "react";
import DeliveryPlanPage from "./delivery_plan/DeliveryPlanPage";
import LoginForm from "./user_registration/LoginForm";

const { Content } = Layout;

const PageContent = ({navigationKey}) => {

    const [authed, setAuthed] = useState(true); // TODO: change it to false after login implementation is completed

    const renderItem = (key) => {

      if (key === '1') {
        return <HomePage />
      } else if (key === '2') {
        return <DeliveryPlanPage authed={authed}/>
      } else if (key === '3') {
        return <LoginForm setAuthed={setAuthed}/>
      }
      return <div></div>
    }

    return (
        <Content
            style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
        >
        {renderItem(navigationKey)}
      </Content>
    );

};

export default PageContent;