export const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};

export const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid:
        action.val.trim().length >= 6 &&
        !action.val.trim().toLowerCase().includes("password"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid:
        state.value.trim().length >= 6 &&
        !state.value.trim().toLowerCase().includes("password"),
    };
  }
  return { value: "", isValid: null };
};
