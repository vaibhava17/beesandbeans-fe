import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { WarningOutlined } from "@ant-design/icons";

function ErrorBoundaryFallback() {
  return (
    <div className="h-75 w-100 d-flex justify-content-center align-items-center text-center">
      <div>
        <WarningOutlined
          style={{ fontSize: "xxx-large" }}
        />
        <h5 className="text-secondary my-4">Oops! Something went wrong</h5>
        <div>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </Button>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundaryFallback;
