import axios from "axios";
import { BACKEND_URL } from "./config";
import { jwtDecode } from "jwt-decode";
const instance = axios.create({
  baseURL: BACKEND_URL,
});
instance.interceptors.request.use(config => {
  const noTokenRequired = ['api/auth/login','/api/admin/register'];
  const requiresToken = !noTokenRequired.some(endpoint => config.url.endsWith(endpoint));
  if (requiresToken) {
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
              window.location.href = '/login';
              return Promise.reject(new Error("Token expired"));
          }

          config.headers['Authorization'] = `Bearer ${token}`;
      }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
