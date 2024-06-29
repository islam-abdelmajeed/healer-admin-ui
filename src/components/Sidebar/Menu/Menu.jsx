import SidebarItem from "../SidebarItem/SidebarItem";

import styles from "./menu.module.scss";

import SidebarItemList from "../SidebarItemList/SidebarItemList";
import { useConfig } from "@config";

const Menu = () => {
  const [SIDEBAR_ITEMS] = useConfig();
  return (
    <div className={styles.menu}>
      <ul>
        {SIDEBAR_ITEMS.map((item, idx) => (
          <li key={idx} className={item.className}>
            {item.list ? (
              <SidebarItemList item={item} />
            ) : (
              <SidebarItem item={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
