import { Layout } from "antd";
import { useState } from 'react';
import PageHeader from "./components/PageHeader";
import PageContent from "./components/PageContent";
import PageFooter from "./components/PageFooter";

function App() {

  const [navigationKey, setNavigationKey] = useState(`1`);
  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader navigationKey={navigationKey} setNavigationKey={setNavigationKey} />
      <PageContent navigationKey={navigationKey} />    
      <PageFooter />
    </Layout>
  );
}

export default App;
