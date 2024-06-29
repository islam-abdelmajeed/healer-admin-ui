import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

import styles from "./sidebar.module.scss";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Menu />
    </aside>
  );
}
export default Sidebar;
