import { Layout } from "antd";
import HomePage from "./HomePage";
import DeliveryPlanPage from "./delivery_plan/DeliveryPlanPage";

const { Content } = Layout;

const renderItem = (key) => {

  if (key === '1') {
    return <HomePage />
  } else if (key === '2') {
    return <DeliveryPlanPage />
  } else if (key === '3') {
    return <div>placeholder</div>
  }
  return <div></div>
}

const PageContent = ({navigationKey}) => {

    return (
        <Content
            style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
        >
        {renderItem(navigationKey)}
      </Content>
    );

};

export default PageContent;