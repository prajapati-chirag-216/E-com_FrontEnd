import AxiosInstance from "./AxiosInstance/AxiosInstance";

export async function signupUser(userData) {
  const config = {
    method: "POST",
    url: `/user/signup`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}
export async function fetchUserProfile() {
  const config = {
    url: `/user/profile`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function loginUser(userData) {
  const config = {
    method: "POST",
    url: `/user/login`,
    data: userData,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function logoutUser() {
  const config = {
    method: "POST",
    url: `/user/logout`,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
}

export async function forgotPassword(userData) {
  const config = {
    method: "POST",
    url: `/user/forgotPassword`,
    data: userData,
  };
  const response = await AxiosInstance(config);
  return response;
}
export async function resetPassword(userData) {
  const config = {
    method: "POST",
    url: `/user/resetPassword/${userData.id}`,
    data: { password: userData.password },
  };
  const response = await AxiosInstance(config);
  return response;
}
export async function fetchDisplayImage() {
  const config = {
    url: `/fetchDisplayImage`,
  };
  const response = await AxiosInstance(config);
  return response;
}
export const fetchCategory = async (id) => {
  const config = {
    url: `/fetchCategory/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const fetchCategories = async () => {
  const config = {
    url: `/fetchCategories`,
  };
  const response = await AxiosInstance(config);
  return response;
};
export const fetchProduct = async (id) => {
  const config = {
    url: `/getproduct/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};
export const fetchProductDetails = async (id) => {
  const config = {
    url: `/getproductDetails/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const postReview = async (id, reviewObj) => {
  const config = {
    method: "POST",
    url: `/productreview/${id}`,
    data: reviewObj,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return { ...response, status: 200 };
};

export const fetchProductReviews = async (id) => {
  const config = {
    url: `/getproductReviews/${id}`,
  };
  const response = await AxiosInstance(config);
  return response;
};
export const addCartItems = async (items) => {
  const config = {
    method: "POST",
    url: `/addCartItems`,
    data: items,
    withCredentials: true,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const fetchDataByName = async (name, data) => {
  const filterdName = name.split(" ").join("").toLowerCase();
  const filteredData = data.filter((item) => {
    const itemName = item.name.split(" ").join("").toLowerCase();
    return itemName.includes(filterdName);
  });

  return filteredData;
};

export const fetchFilteredProducts = async (id, name) => {
  const config = {
    url: `/getfilteredproducts/${id}/${name}`,
  };
  const response = await AxiosInstance(config);
  return response;
};

export const getPaymentPage = async () => {
  try {
    const config = {
      method: "POST",
      url: `/create-checkout-session`,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const makeOrder = async (orderObj) => {
  try {
    const config = {
      method: "POST",
      url: `/postOrder`,
      data: orderObj,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};
export const fetchOrder = async (orderId) => {
  try {
    const config = {
      method: "GET",
      url: `/getOrder/${orderId}`,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    console.log(response)
    return response;
  } catch (err) {
    throw err;
  }
};
export const getAccessToken = async () => {
  try {
    const config = {
      method: "get",
      url: `/user/getAccessToken`,
      withCredentials: true,
    };
    const response = await AxiosInstance(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postUserMessage = async (message) => {
  try {
    const config = {
      method: "post",
      url: "/postMymeassage",
      data: message,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchUserOrders = async () => {
  try {
    const config = {
      method: "get",
      url: `/getUserOrders`,
      withCredentials: true,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};

export const UpdateUserInformation = async (updateObj) => {
  try {
    const config = {
      method: "patch",
      url: `/updateUser`,
      data: updateObj,
      withCredentials: true,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchSingleCategoryByName = async (name) => {
  try {
    const config = {
      method: "get",
      url: `/getCategoryByName/${name}`,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (passObj) => {
  try {
    const config = {
      method: "patch",
      url: "/updatePassword",
      data: passObj,
      withCredentials: true,
    };

    const response = await AxiosInstance(config);

    return response;
  } catch (err) {
    throw err;
  }
};
