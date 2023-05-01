import axios from "axios";
import store from "./store";
import router from "./router";

function createAxiosInstance(baseURL) {
  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem("TOKEN");
        router.push({ name: "Login" });
      } else if (error.response.status === 404) {
        //router.push({ name: "NotFound" });
      }
      return error;
    }
  );

  return axiosInstance;
}

export const axiosUsers = createAxiosInstance(
  `${import.meta.env.VITE_API_USERS_URL}/api`
);
export const axiosCertificates = createAxiosInstance(
  `${import.meta.env.VITE_API_CERTIFICATES_URL}/api`
);
export const axiosEvents = createAxiosInstance(
  `${import.meta.env.VITE_API_EVENTS_URL}/api`
);