import { create } from "zustand";

export const useAuth = create((set) => ({
  data: {},
  getName: () =>
    `${localStorage.getItem("name")} `,
  isLoggedIn: localStorage.getItem("token") !== null,
  onLogin: (token, name, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    set({ isLoggedIn: true, data: { token, name, role } });
  },
  onLogout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false, data: {} });
  },
  getRole: () => localStorage.getItem("role"),

}));
