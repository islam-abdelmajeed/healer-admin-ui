import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/use-auth";

import styles from "./mainLayout.module.scss";

const MainLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    setShowContent(isLoggedIn);
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    showContent && (
      <div className={styles["main-layout"]}>
        <Sidebar />
        <div className={styles["main-wrapper"]}>
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
};

export default MainLayout;
