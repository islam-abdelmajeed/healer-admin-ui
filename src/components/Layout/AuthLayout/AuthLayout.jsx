import LogoWhiteIcon from "../../../icons/LogoWhiteIcon";
import { Link, Outlet, useLocation } from "react-router-dom";

import styles from "./authLayout.module.scss";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className={styles["auth-layout"]}>
      <div>
        <LogoWhiteIcon />
        <div className={styles["chart-box"]}>
          <img src="/assets/chart.png" alt="chart" />
        </div>
        <div className={styles["login-message"]}>
          <h3>welcome back</h3>
          <p>everything you need in an easily.</p>
        </div>
      </div>
      <div className={styles["auth-layout__actions"]}>
        <div>
          <div>
            <Link
              to="/login"
              className={location.pathname === "/login" ? styles.active : null}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={location.pathname === "/signup" ? styles.active : null}
            >
              Sign up
            </Link>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
