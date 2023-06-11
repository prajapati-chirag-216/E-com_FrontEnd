import { getAccessToken } from "../utils/api";
import { setAccessToken } from "../store/ui/ui.action";
import { store } from "../store/store";
export function cookieParser() {
  const data = {};
  document.cookie.split(";").map((ele) => {
    return (data[ele.trim().split("=")[0]] = ele.split("=")[1]);
  });
  return data;
}

export const genrateAccessToken = async () => {
  const response = await getAccessToken();
  return response;
};

export const textFeildStyle = (feildIsValid) => {
  return {
    "& .MuiInputLabel-root.Mui-focused": {
      color:
        feildIsValid === false
          ? "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))"
          : "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor:
        feildIsValid === false
          ? "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))"
          : "black",
    },
    "& .MuiInputLabel-root": {
      color:
        feildIsValid === false
          ? "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))"
          : "gray",
      letterSpacing: "0.5px",
    },
  };
};
