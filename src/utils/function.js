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
export const formateData = (value, formateWith, validLength) => {
  let data = value.replace(/\s/g, "").replace(/\D/g, "");

  let formattedData = "";

  for (let i = 0; i < data.length; i++) {
    formattedData += data[i];
    if ((i + 1) % 4 === 0 && i !== data.length - 1) {
      formattedData += formateWith;
    }
  }

  if (data.length > validLength) {
    data = data.slice(0, validLength - 1);
    formattedData = formattedData.slice(0, validLength + 2);
  }
  return formattedData;
};
export const formateDate = (value) => {
  let extractedDate = value.replace(/\s/g, "").replace(/\D/g, "");

  let tempDate = "";

  for (let i = 0; i < extractedDate.length; i++) {
    tempDate += extractedDate[i];
    if (tempDate.length === 2) {
      tempDate += "/";
    }
  }
  if (tempDate.length > 5) {
    tempDate = tempDate.slice(0, 5);
  }
  let newDate = tempDate.split("/");
  let isValid = newDate[0] !== "00" && +newDate[0] <= 12 && +newDate[1] > 23; // letter we will change to currunt time
  return { tempDate, isValid };
};
