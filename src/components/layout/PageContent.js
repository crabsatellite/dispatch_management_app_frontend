import { Layout } from "antd";
import { useState } from "react";
import HomePage from "../home/HomePage";
import DeliveryPlanPage from "../delivery_plan/DeliveryPlanPage";
import LoginForm from "../user_portal/LoginForm";

const { Content } = Layout;

const PageContent = ({navigationKey}) => {

    // TODO: change it to false after backend API integration for login is completed,
    // since unauthenticated status might blocks some testing on delivery plan page
    const [authed, setAuthed] = useState(true); 

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