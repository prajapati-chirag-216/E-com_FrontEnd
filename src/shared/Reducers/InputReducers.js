export const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val.trim(),
      isValid: action.val.trim().length > 5 && action.val.trim().length <= 10,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value.trim(),
      isValid: state.value.trim().length > 5 && state.value.trim().length <= 10,
    };
  }
  return { value: "", isValid: null };
};
export const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val.trim(),
      isValid: action.val.trim().includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value.trim(),
      isValid: state.value.trim().includes("@"),
    };
  }
  return { value: "", isValid: null };
};

export const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid:
        action.val.trim().length >= 6 &&
        action.val.trim().length <= 8 &&
        !action.val.trim().toLowerCase().includes("password"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid:
        state.value.trim().length >= 6 &&
        state.value.trim().length <= 8 &&
        !state.value.trim().toLowerCase().includes("password"),
    };
  }
  return { value: "", isValid: null };
};

// export const phoneNoReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     if (action.val.trim().length >= 11) {
//       return { value: action.val.trim().slice(0, 10), isValid: true };
//     }
//     return {
//       value: action.val.trim(),
//       isValid: action.val.trim().length === 10,
//     };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return {
//       value: state.value.trim(),
//       isValid: state.value.trim().length === 10,
//     };
//   }
//   return { value: "", isValid: null };
// };
export const phoneNoReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    let phoneNumber = action.val.replace(/\s/g, "").replace(/\D/g, "");

    let formattedPhoneNumber = "";

    for (let i = 0; i < phoneNumber.length; i++) {
      formattedPhoneNumber += phoneNumber[i];
      if ((i + 1) % 4 === 0 && i !== phoneNumber.length - 1) {
        formattedPhoneNumber += "-";
      }
    }

    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.slice(0, 9);
      formattedPhoneNumber = formattedPhoneNumber.slice(0, 12);
    }
    return {
      value: formattedPhoneNumber,
      isValid: formattedPhoneNumber.length === 12,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.length === 12,
    };
  }
  return { value: "", isValid: null };
};
export const generalReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.length > 0 && action.val.length < 30,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.length > 0 && state.value.length < 30,
    };
  }
  return { value: "", isValid: null };
};
export const pinCodeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    if (action.val.trim().length === 7) {
      return { value: state.value.trim(), isValid: true };
    }
    return {
      value: action.val.trim(),
      isValid: action.val.trim().length === 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value.trim(),
      isValid: state.value.trim().length === 6,
    };
  }
  return { value: "", isValid: null };
};

export const cardNoReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    let cardNumber = action.val.replace(/\s/g, "").replace(/\D/g, "");

    let formattedCardNumber = "";

    for (let i = 0; i < cardNumber.length; i++) {
      formattedCardNumber += cardNumber[i];
      if ((i + 1) % 4 === 0 && i !== cardNumber.length - 1) {
        formattedCardNumber += " ";
      }
    }

    if (cardNumber.length > 12) {
      cardNumber = cardNumber.slice(0, 11);
      formattedCardNumber = formattedCardNumber.slice(0, 14);
    }
    return {
      value: formattedCardNumber,
      isValid: formattedCardNumber.length === 14,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.length === 14,
    };
  }
  return { value: "", isValid: null };
};
export const cvvReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    if (action.val.trim().length === 5) {
      return { value: state.value.trim(), isValid: true };
    }
    return {
      value: action.val.trim(),
      isValid: action.val.trim().length >= 3 && action.val.trim().length <= 4,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value.trim(),
      isValid: state.value.trim().length >= 3 && state.value.trim().length <= 4,
    };
  }
  return { value: "", isValid: null };
};

export const expiryDateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    let extractedDate = action.val.replace(/\s/g, "").replace(/\D/g, "");

    let tempDate = "";

    for (let i = 0; i < extractedDate.length; i++) {
      tempDate += extractedDate[i];

      if (tempDate.length === 2) {
        tempDate += "/";
      }
    }
    let newDate = tempDate.split("/");

    let isValid = newDate[0] !== "00" && +newDate[0] <= 12 && +newDate[1] > 23; // letter we will change to currunt time
    isValid = isValid && newDate.join("").length === 4;
    if (tempDate.length > 5) {
      tempDate = tempDate.slice(0, 5);
    }
    return {
      value: tempDate,
      isValid: isValid,
    };
  }
  if (action.type === "INPUT_BLUR") {
    let newDate = state.value.split("/");

    let isValid = newDate[0] !== "00" && +newDate[0] <= 12 && +newDate[1] > 23;

    isValid = isValid && newDate.join("").length === 4;
    return {
      value: state.value,
      isValid: isValid,
    };
  }
  return { value: "", isValid: null };
};
