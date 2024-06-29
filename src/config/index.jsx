import OrdersIcon from "@icons/OrdersIcon";
import SupplierIcon from "@icons/SupplierIcon";
import AdsIcon from "@icons/AdsIcon";
import SettingsIcon from "@icons/SettingsIcon";
import SupportIcon from "@icons/SupportIcon";
import { useAuth } from "@hooks/use-auth";
import HomeIcon from './assets/home.png';
import PlayerIcon from './assets/player.png';
import CourtIcon from './assets/court.png';

import styles from "./style.module.scss";

// const BACKEND = "LOCAL";

const urls = {
  LOCAL: "https://uber-health-system.onrender.com",
  SERVER: "",
};

const BACKEND_URL = import.meta.env.VITE_URL || urls["LOCAL"];

export const useConfig = () => {
  const { onLogout } = useAuth();

  const SIDEBAR_ITEMS = [
    {
      icon: PlayerIcon,
      label: "home",
      to: "/",
    },
    {
      icon: PlayerIcon,
      label: "patients",
      to: "/patient",
    },
    {
      icon: PlayerIcon,
      label: "Doctors",
      to: "/doctor",
    },
    {
      icon: PlayerIcon,
      label: "Doctors status",
      to: "/doctorstatus",
    },
    {
      icon: PlayerIcon,
      label: "Reports",
      to: "/report",
    }
  ];

  return [SIDEBAR_ITEMS];
};

export { BACKEND_URL };
