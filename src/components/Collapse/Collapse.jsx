import React from "react";
import { Collapse, Typography } from "antd";
import styles from "./collapse.module.css";

const { Panel } = Collapse;

const AppCollapse = (props) => {
  const { headerName, data } = props;
  return (
    <div className="px-md-5 px-3 w-100">
      {headerName && (
        <Typography.Title level={4} className={`text-center ${styles.header}`}>{headerName}</Typography.Title>
      )}
      <Collapse
        accordion
        destroyInactivePanel
        ghost
        expandIconPosition="end"
        expandIcon={({ isActive }) =>
          isActive ? (
            <i className={`fas fa-minus ${styles.icon}`} />
          ) : (
            <i className={`fas fa-plus ${styles.icon}`} />
          )
        }
      >
        {data.map((item, index) => (
          <Panel
            className={styles.panel}
            header={<Typography.Text className={styles.question}>{item.question}</Typography.Text>}
            key={index}
          >
            {item.answer && <Typography.Text className={styles.answer} >{item.answer}</Typography.Text>}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default AppCollapse;
