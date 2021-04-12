import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import AppButton from "./AppButton";
import ColorPallete from "../config/ColorPallete";
import HelperFunctions from "../config/HelperFunctions";
import Modal from "./Modal";
import TextInput from "./TextInput";

function ColorPicker({ hideModal, pick }) {
  const { colors } = useTheme();
  const [SelectedColor, SetSelectedColor] = useState("white");
  const [ColorError, SetColorError] = useState(false);
  const [ColorInput, SetColorInput] = useState("");
  const [VariantInput, SetVariantInput] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

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
    <View style={styles.container}>
      <Modal modalVisible={true} hideModal={hideModal}>
        <View style={styles.ModalBox}>
          <TextInput
            label="Enter Color (hex allowed)"
            Error={"Should be a Valid Color"}
            ErrorVisibility={ColorError}
            onChangeText={(text) => SetColorInput(text)}
          />
          <TextInput
            placeholder="Enter Name of Variant (optional)"
            onChangeText={(text) => SetVariantInput(text)}
          />
          <View
            style={[styles.ColorCircle, { backgroundColor: SelectedColor }]}
          ></View>
          <View style={styles.BTNS}>
            <AppButton
              Title="Add"
              backgroundColor={ColorPallete.primary}
              color="white"
              onPress={() =>
                ColorError
                  ? null
                  : ColorInput.length !== 0
                  ? pick({
                      ColorInput,
                      VariantInput,
                    })
                  : SetColorError(true)
              }
              style={styles.AddBTN}
            />
            <AppButton
              Title="Cancel"
              onPress={hideModal}
              style={[styles.CancelBTN, { borderColor: colors.text }]}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ColorPicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  ModalBox: {
    width: 300,
    height: "auto",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
  },
  ColorCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
  },
  BTNS: {
    flexDirection: "row",
    marginTop: 30,
  },
  AddBTN: {
    borderRadius: 10,
    marginRight: 10,
  },
  CancelBTN: {
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
