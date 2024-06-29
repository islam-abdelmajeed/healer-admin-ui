import { Link, useLocation } from "react-router-dom";
import styles from "./sidebarItem.module.scss";

const SidebarItem = (props) => {
  const location = useLocation();

  const { item, className } = props;


  const getClassName = () => {
    const classNames = [];
    classNames.push(className);
    classNames.push(styles.sidebarItem);
    if (location.pathname === item?.to) {
      classNames.push(styles.active);

      if (item?.label === "support") {
        classNames.push(styles.active_stroke);
      }
    }
    return classNames.join(" ");
  };

  const ItemBody = (
    <>
      <div>
        <img src={item?.icon} alt="icon" />
        <span>{item?.label}</span>
      </div>
      {item.notifications && (
        <div className={styles.notifications}>{item.notifications}</div>
      )}
    </>
  );

  const ButtonItem = (
    <button className={getClassName()} onClick={item?.onClick}>
      {ItemBody}
    </button>
  );

  const LinkItem = (
    <Link className={getClassName()} to={item?.to}>
      {ItemBody}
    </Link>
  );

  return item.to ? LinkItem : ButtonItem;
};

export default SidebarItem;
