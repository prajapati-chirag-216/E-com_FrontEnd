import { Fragment } from "react";
import "./contactus.styles.scss";
import { Card, TextField, Button } from "@mui/material";
import { Form } from "react-router-dom";
import { postUserMessage } from "../../utils/api";
import { setSnackBar } from "../../store/ui/ui.action";
import { useDispatch } from "react-redux";
import { store } from "../../store/store";
import { useEffect } from "react";
import { startConfetti } from "../../utils/confetti";
const ContactUs = () => {
  const dispatch = useDispatch();

  

  return (
    <Fragment>
      <div>
        <div className="contactUsContainer">
          <div className="headerContainer">
            <h2 style={{ textTransform: "uppercase", letterSpacing: "3px" }}>
              {" "}
              contact Us
            </h2>

            <h3 style={{ letterSpacing: "2px" }}>
              Feel Free To Call Us at{" "}
              <span style={{ color: "gray" }}>
                +917405547234 Or +917487935333
              </span>{" "}
              (10:00 am To 6:00 pm){" "}
            </h3>
          </div>

          <div className="addressContainer">
            <Card variant="outlined" style={{ padding: "1rem" }}>
              <h2 style={{ textDecoration: "underline" }}>
                Postal Address For Indian Customers:-
              </h2>
              <ul>
                <li>45/360,Sunrise Tower,</li>
                <li>Ahmedabad,</li>
                <li>Gujrat,</li>
                <li>India,</li>
                <li>380064</li>
              </ul>
            </Card>
          </div>

          <div className="MessageFormContainer">
            <h2 style={{ textTransform: "uppercase", letterSpacing: "3px" }}>
              send us your message
            </h2>

            <Form method="post" action={"/contactus"}>
              <div className="formContainer">
                <div className="UpperPartContainer">
                  <TextField
                    style={{ width: "19rem" }}
                    name="name"
                    id="outlined-basic"
                    label="Your Name"
                    variant="outlined"
                  />
                  <TextField
                    style={{ width: "19rem" }}
                    name="email"
                    id="outlined-basic"
                    label="Your Email"
                    variant="outlined"
                  />
                </div>
                <TextField
                  name="phone"
                  id="outlined-basic"
                  label="Your Phone(optional)"
                  variant="outlined"
                />
                <TextField
                  name="message"
                  id="outlined-multiline-static"
                  label="Your Message"
                  multiline
                  rows={7}
                />

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    padding: "1rem",
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                    borderRadius: "0rem",
                  }}
                >
                  Send Your Message
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export async function action({ request }) {
  const formData = await request.formData();

  const messageObj = {
    userName: formData.get("name"),
    userEmail: formData.get("email"),
    phonNo: formData.get("phone"),
    message: formData.get("message"),
  };

  try {
    const response = await postUserMessage(messageObj);

    store.dispatch(
      setSnackBar({
        status: true,
        message: "Your Message Has Been Sent Sucssesfully!",
      })
    );
    return response;
  } catch (err) {
    store.dispatch(
      setSnackBar({
        status: true,
        message: "Somthing Went Wrong While Sending Message!",
      })
    );
  }
}

export default ContactUs;
