import React from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowIcon from "../../../icons/ArrowIcon";

import styles from "./SidebarItemList.module.scss";

const SidebarItemList = ({ item }) => {
  const [active, setActive] = React.useState(false);
  const location = useLocation();

  const onClickHandler = () => {
    setActive((prevState) => !prevState);
  };

  const { label, icon, list } = item;

  return (
    <>
      <button
        onClick={onClickHandler} className={`${styles.button} ${active ? styles.active : ""} `} >
        <img src={icon} alt="icon" />
        <span>{label}</span>
        <ArrowIcon />
      </button>
      {active && (
        <ul className={styles.list}>
          {list.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className={location.pathname === item.to ? styles.active : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SidebarItemList;
