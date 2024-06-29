import { Link } from "react-router-dom";
import LogoIcon from '../assets/loogo.png';
import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoIcon} alt="logo"/>
    </Link>
  );
};

export default Logo;
