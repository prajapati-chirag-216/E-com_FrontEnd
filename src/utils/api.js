import axios from "axios";

const BACKAND_DOMAIN = "http://localhost:8000";

export async function signupUser(userData) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/user/signup`,
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
export async function loginUser(userData) {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/user/login`,
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
      `${BACKAND_DOMAIN}/user/logout`,
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
    const response = await axios.post(`${BACKAND_DOMAIN}/user/forgotPassword`, {
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
      `${BACKAND_DOMAIN}/user/resetPassword/${userData.id}`,
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
export async function fetchDisplayImage() {
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/admin/fetchDisplayImage`
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
export const addCartItems = async (items) => {
  try {
    const response = await axios.post(
      `${BACKAND_DOMAIN}/addCartItems`,
      {
        ...items,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchDataByName = async (name, data) => {
  const filterdName = name.split(" ").join("").toLowerCase();
  console.log(data);

  const filteredData = data.filter((item) => {
    const itemName = item.name.split(" ").join("").toLowerCase();

    return itemName.includes(filterdName);
  });

  return filteredData;
};

export const fetchFilteredProducts = async (id, name) => {
  console.log(id, name);
  try {
    const response = await axios.get(
      `${BACKAND_DOMAIN}/getfilteredproducts/${id}/${name}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};


export const getPaymentPage = async() =>{


  try{
    const result = await axios.post(`${BACKAND_DOMAIN}/create-checkout-session`)
    
     return result
  }
  catch(err){
    throw err;
  }

}



export const makeOrder = async(orderObj) =>{


  try{
    const result = await axios.post(`${BACKAND_DOMAIN}/postOrder`,orderObj)
    
     return result
  }
  catch(err){
    throw err;
  }

}
