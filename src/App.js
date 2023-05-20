/**
 * Copyright (c) 2023
 *
 * @summary Implementation of App.js
 * @author 202302 Flag Camp Team03
 * @date 2023-04-28
 *
 */

// Project includes
import PageHeader from "./components/layout/PageHeader";
import PageContent from "./components/layout/PageContent";
import PageFooter from "./components/layout/PageFooter";

// React imports
import { useState } from "react";
import { useEffect } from "react";

// Antd imports
import { Layout } from "antd";

function App() {
  const [navigationKey, setNavigationKey] = useState(
    localStorage.getItem("navigationKey") || `1`
  );

  useEffect(() => {
    localStorage.setItem("navigationKey", navigationKey);
  }, [navigationKey]);
  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader
        navigationKey={navigationKey}
        setNavigationKey={setNavigationKey}
      />
      <PageContent
        navigationKey={navigationKey}
        setNavigationKey={setNavigationKey}
      />
      <PageFooter />
    </Layout>
  );
}

export default App;
