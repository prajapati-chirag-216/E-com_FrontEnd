import axios from "axios";

const BACKAND_DOMAIN = "http://localhost:8000";

export async function loginUser(userData) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/login`,
      {
        ...userData,
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function logoutUser() {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Logout." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function forgotPassword(userData) {
  try {
    const response = await axios.post(`${BACKAND_DOMAIN}/forgotPassword`, {
      ...userData,
    });
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Somthing went wrong." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function resetPassword(userData) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/resetPassword/${userData.id}`,
      {
        password: userData.password,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to reset password." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function addDisplayImage(image) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/user/addDisplayImage`,
      {
        image,
      },
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function fetchDisplayImage() {
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/admin/fetchDisplayImage`
    );
    const data = response.data;
    console.log("dara ", data);
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function deleteDisplayImage(id) {
  try {
    const response = await axios.delete(
      `${BACKAND_DOMAIN}/user/deleteDisplayImage/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (response.statusText !== "OK") {
      throw new Error({ message: data.message || "Unable to Login." });
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export const fetchCategory = async (id) => {
  try {
    const response = await axios.get(`${BACKAND_DOMAIN}/fetchCategory/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BACKAND_DOMAIN}/fetchCategories`);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};
export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`${BACKAND_DOMAIN}/getproduct/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    throw err;
  }
};
export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/getproductDetails/${id}`
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export const postReview = async (id, reviewObj) => {
  let response;

  try {
    response = await axios.post(
      `${BACKAND_DOMAIN}/productreview/${id}`,
      reviewObj
    );
  } catch (err) {
    throw err;
  }

  return response;
};

export const fetchProductReviews = async (id) => {
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/getproductReviews/${id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
