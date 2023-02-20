import React from "react";
import styles from "./stats.module.css";

const year = new Date().getFullYear();
const totalYears = year - 2018;

const statsData = [
  {
    stats: totalYears,
    label: "Years",
  },
  {
    stats: "300+",
    label: "Customers",
  },
  {
    stats: "200",
    label: "Followers",
  },
  {
    stats: "100+",
    label: "Products",
  },
];

const Stats = () => {
  return (
    <div className="row p-4 text-center">
      {statsData.map((stat, i) => (
        <div className="col-lg-3 col-md-6 p-3" key={i}>
          <div
            className={`${styles.card} mx-auto bg-light p-3 align-items-center d-flex flex-column justify-content-evenly`}
          >
            <div className={styles.stats}>{stat.stats}</div>
            <hr className="m-0" />
            <div className={styles.title}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
