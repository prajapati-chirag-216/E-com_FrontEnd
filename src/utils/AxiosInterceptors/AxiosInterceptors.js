import { store } from "../../store/store";
import { setSnackBar } from "../../store/ui/ui.action";
import axios from "../axios/axios";
import { genrateAccessToken } from "../function";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    console.log(error);
    if (
      error.response?.status === 403 &&
      error.response?.data?.refreshTokenDecoded &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      await genrateAccessToken();
      return axios(originalConfig);
    } else if (
      error.response?.status === 401 ||
      error.response?.status === 409
    ) {
      console.log("error ", error);
      store.dispatch(
        setSnackBar({
          status: true,
          message: error.response?.data?.text || "somthing went wrong",
          severity: "warning",
        })
      );
    }
    return Promise.reject(error);
  }
);
