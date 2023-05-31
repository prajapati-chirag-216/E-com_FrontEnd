import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import {
  validateCardNumber,
  validateExpiryDate,
} from "../../../utils/function";
import "./Payment.styles.scss";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");

  const handleCardNumber = (value) => {
    let cardNumber = value.replace(/\s/g, "").replace(/\D/g, "");

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

    validateCardNumber(formattedCardNumber);

    const icon = document.getElementById("visaIcon");

    if (formattedCardNumber.replace(/\s/g, "") === "424242424242") {
      icon.style.visibility = "visible";
    } else {
      icon.style.visibility = "hidden";
    }

    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDate = (date) => {
    let extractedDate = date.replace(/\s/g, "").replace(/\D/g, "");

    let tempDate = "";

    for (let i = 0; i < extractedDate.length; i++) {
      tempDate += extractedDate[i];

      if (tempDate.length == 2) {
        tempDate += "/";
      }
    }

    if (tempDate.length > 5) {
      tempDate = tempDate.slice(0, 5);
    }

    validateExpiryDate(tempDate);

    setExpiryDate(tempDate);
  };

  const handleCvv = (cvv) => {
    let newCvv = cvv.replace(/\s/g, "").replace(/\D/g, "");

    if (newCvv.length > 4) {
      newCvv = newCvv.slice(0, 4);
    }

    setCvv(newCvv);
  };

  const handleHolderName = (name) => {
    let newName = name.replace(/\d/g, "");

    setHolderName(newName);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "4rem",
        flexDirection: "column",
        paddingBottom: "5rem",
        background: "red",
      }}
    >
      {/* <div className="paymentPageContainer" style={{ background: "red" }}> */}
      <div className="paymentFormContainer">
        <h1
          style={{
            display: "flex",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontSize: "2rem",
            justifyContent: "flex-start",
          }}
        >
          Payment
        </h1>

        <div className="paymentCardContainer">
          <div className="headerContainer">
            <div>Credit Card/Debit Card</div>

            <div className="headerIcons">
              <img src="visa.svg" />
              <img src="mastercard.svg" />
              <img src="american-express.svg" />
            </div>
          </div>

          <Divider />

          <div className="cardInputContainer">
            <div className="cardNumberContainer">
              <label
                style={{ fontSize: "20px", letterSpacing: "2px" }}
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <div>
                <input
                  id="cardNumber"
                  value={cardNumber}
                  type="text"
                  placeholder="1234 1234 1234"
                  onChange={(event) => handleCardNumber(event.target.value)}
                />
                <span id="visaIcon">
                  <img src="visa.svg" />
                </span>
              </div>

              <h5
                style={{
                  color: "red",
                  marginTop: "1rem",
                  letterSpacing: "2px",
                }}
                id="cardNumberErrorText"
              ></h5>
            </div>

            <div className="cardholderNameContainer">
              <label
                style={{ fontSize: "20px", letterSpacing: "2px" }}
                htmlFor="holderName"
              >
                Card Holder Name
              </label>
              <input
                value={holderName}
                id="holdername"
                type="text"
                onChange={(event) => handleHolderName(event.target.value)}
              />
            </div>

            <div className="cardDetailsContainer">
              <div className="expiryDateContainer">
                <label
                  style={{ fontSize: "20px", letterSpacing: "2px" }}
                  htmlFor="expiryDate"
                >
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  value={expiryDate}
                  type="text"
                  placeholder="MM/YY"
                  onChange={(event) => handleExpiryDate(event.target.value)}
                />
                <h5
                  style={{ color: "red", margin: "0px", letterSpacing: "2px" }}
                  id="exiparyDateErrorText"
                ></h5>
              </div>

              <div className="cardCvvContainer">
                <label
                  htmlFor="cvv"
                  style={{ fontSize: "20px", letterSpacing: "2px" }}
                >
                  CVV
                </label>
                <input
                  value={cvv}
                  id="cvv"
                  type="text"
                  placeholder="1234"
                  onChange={(event) => handleCvv(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          sx={{
            background: "black",
            "&:hover": { background: "black" },
            borderRadius: 0,
            width: "30rem",
            height: "4rem",
            letterSpacing: "3px",
            fontSize: "1.1rem",
            "&:active": { transform: "scale(0.9)" },
          }}
          variant="contained"
        >
          Pay Now
        </Button>
      </div>
      {/* </div> */}
    </Box>
  );
};

export default Payment;
