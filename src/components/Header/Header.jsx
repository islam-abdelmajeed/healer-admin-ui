import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import styles from "./header.module.scss";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const {  getName, getRole,onLogout } = useAuth();
  const navigate=useNavigate()
  return (
    <header className={styles.header}>
      <button className={styles.custombutton}>
        <img src="/assets/profile.png" alt="profile" />
        <span></span>
      </button>
      <div className={styles.info}>
        <h4>{getName()}</h4>
        <h5>{getRole()}</h5>
      </div>
        <button onClick={()=>{
          onLogout()
          navigate("/login")
  
        }}  className={`${styles.logoutButton}`}>
        <CiLogout size="24px" />
          <span className="ms-1">Logout</span>
        </button>
    </header>
  );
};

export default Header;
