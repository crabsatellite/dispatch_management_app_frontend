
// Project includes
import PageHeader from "./components/layout/PageHeader";
import PageContent from "./components/layout/PageContent";
import PageFooter from "./components/layout/PageFooter";

// Antd imports
import { Layout } from "antd";

// React imports
import { useState } from 'react';

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
