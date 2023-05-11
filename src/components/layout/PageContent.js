/**
 * Copyright (c) 2023
 *
 * @summary Implementation of PageContent.js
 * @author 202302 Flag Camp Team03
 * @date 2023-04-28  
 *  
 */

// Project imports
import HomePage from "../home/HomePage";
import UserPortalPage from "../user_portal/UserPortalPage";
import DeliveryPlanPage from "../delivery_plan/DeliveryPlanPage";

// Antd imports
import { Layout } from "antd";

// React imports
import { useState } from "react";

const { Content } = Layout;

const PageContent = ({ navigationKey, setNavigationKey }) => {
  // TODO: change it to false after backend API integration for login is completed,
  // since unauthenticated status might blocks some testing on delivery plan page
  const [authed, setAuthed] = useState(true);

  const renderItem = (key) => {
    if (key === "1") {
      return <HomePage setNavigationKey={setNavigationKey} />;
    } else if (key === "2") {
      return <DeliveryPlanPage authed={authed} setNavigationKey={setNavigationKey}/>;
    } else if (key === "3") {
      return <UserPortalPage authed={authed} setAuthed={setAuthed} setNavigationKey={setNavigationKey}/>;
    }
    return <div></div>;
  };

  return (
    <Content
      style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
    >
      {renderItem(navigationKey)}
    </Content>
  );
};

export default PageContent;
