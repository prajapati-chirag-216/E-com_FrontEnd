import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";

const steps = ["Cart", "Information", "Shipping", "Payment"];
function CustomStepIcon(props) {
  return (
    <StepIcon
      {...props}
      completed={props.completed}
      active={props.active}
      style={{ color: props.completed ? "black" : "gray" }}
    />
  );
}
const SimpleStepper = () => {
  return (
    <Stepper activeStep={1} alternativeLabel sx={{ width: "60%" }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default SimpleStepper;
