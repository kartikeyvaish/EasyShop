import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ColorPallete from "../config/ColorPallete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "red",
    padding: 0,
    margin: 0,
  },
  icon: {
    color: `${ColorPallete.primary} !important`,
  },
  completed: {
    color: `${ColorPallete.primary} !important`,
  },
}));

export default function StepperBars({
  steps = [],
  activeStep,
  completed = {},
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} nonLinear>
        {steps.map((label) => (
          <Step
            key={label}
            completed={completed[label] ? completed[label] : false}
          >
            <StepLabel
              StepIconProps={{
                classes: {
                  active: classes.icon,
                  completed: classes.completed,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
