import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./routes";
import { Spin } from "antd";
import DataWrapper from "components/ErrorBoundary/DataWrapper";
import Navbar from "components/Navbar/Navbar";

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div style={{ width: "100%", height: "100vh" }} className="d-flex align-items-center justify-content-center">
          <Spin size="large" />
        </div>
      }>
        <Routes>
          {PublicRoutes.map((i) => {
            return (
              <Route
                exact={i.exact}
                key={i.path}
                path={i.path}
                element={
                  <DataWrapper>
                    <div className="container-fluid p-0">
                      {i.Navbar && <i.Navbar />}
                      <i.Component />
                      {i.Footer && <i.Footer />}
                    </div>
                  </DataWrapper>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
