import ChevronRightIcon from "@icons/ChevronRightIcon";
import styles from "./breadcrumbs.module.scss";

const Breadecrumbs = ({ list }) => {
  return (
    <div className={styles.breadcrumbs}>
      <ul>
        {list.map((item, idx) => (
          <li key={idx}>
            {!!idx && <ChevronRightIcon />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadecrumbs;
