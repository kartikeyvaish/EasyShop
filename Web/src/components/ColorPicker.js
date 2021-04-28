import { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";

import Button from "./Button";
import HelperFunctions from "../config/HelperFunctions";
import TextInput from "./TextInput";
import ThemedDiv from "./ThemedDiv";
import Text from "./Text";

function ColorPicker({ open, handleClose, pick }) {
  const [SelectedColor, SetSelectedColor] = useState("white");
  const [ColorError, SetColorError] = useState(false);
  const [ColorInput, SetColorInput] = useState("");
  const [VariantInput, SetVariantInput] = useState("");

  useEffect(() => {
    let color = HelperFunctions.CheckColor(ColorInput);
    if (ColorInput.length !== 0) {
      if (color !== "None") {
        SetSelectedColor(color);
        SetColorError(false);
      } else {
        SetSelectedColor("white");
        SetColorError(true);
      }
    } else {
      SetColorError(false);
    }
  }, [ColorInput]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <ThemedDiv style={{ padding: 15 }}>
        <Text
          text="Add Color"
          size={20}
          family="Mulish"
          weight="700"
          marginBottom={15}
        />

        <TextInput
          label="Enter Color"
          error="Should be a Valid Color"
          ErrorVisibility={ColorError}
          onChange={(e) => SetColorInput(e.target.value)}
        />
        <TextInput
          label="Variant Name (optional)"
          onChange={(e) => SetVariantInput(e.target.value)}
        />

        <div style={styles.SelectedColorBox}>
          <div
            style={{
              backgroundColor: SelectedColor,
              ...styles.SelectedColorCircle,
            }}
          ></div>
        </div>

        <div style={styles.BTNS}>
          <Button
            marginLeft={5}
            marginRight={5}
            Title="Add"
            onClick={() =>
              ColorError
                ? null
                : ColorInput.length !== 0
                ? pick({
                    ColorInput,
                    VariantInput,
                  })
                : SetColorError(true)
            }
          />
          <Button
            marginLeft={5}
            marginRight={5}
            backgroundColor={"grey"}
            Title="Cancel"
            onClick={handleClose}
          />
        </div>
      </ThemedDiv>
    </Dialog>
  );
}

export default ColorPicker;

const styles = {
  SelectedColorBox: {
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  SelectedColorCircle: {
    width: 60,
    height: 60,
    borderRadius: "50%",
  },
  BTNS: {
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
