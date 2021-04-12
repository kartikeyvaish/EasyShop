import React from "react";
import { View, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ActionSheet } from "native-base";

import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";

let Options = [
  { text: "Make Default Address" },
  { text: "Edit", icon: "ios-build", iconColor: "#2c8ef4" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" },
];
let DESTRUCTIVE_INDEX = 2;
let CANCEL_INDEX = 3;

function AddressCard(props) {
  const { colors } = useTheme();
  const [clicked, setclicked] = React.useState(null);

  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppText Title={props.Name} size={20} family="Roboto_medium" />
        {props.Default ? (
          <AppText
            Title="DEFAULT"
            color="white"
            size={12}
            style={styles.Default}
          />
        ) : null}
      </View>
      <AppText Title={props.Address} size={15} family="Inter" />
      {props.Locality ? (
        <AppText Title={props.Locality} size={15} family="Inter" />
      ) : null}
      <AppText
        Title={props.City + ", " + props.State}
        size={15}
        family="Inter"
      />
      <AppText Title={props.Pincode} size={15} family="Inter" />
      <AppText Title={props.Phone} size={13} family="Inter" />

      {props.showOptions ? (
        <View style={styles.OptionsBTN}>
          <SimpleLineIcons
            name="options-vertical"
            size={18}
            onPress={() =>
              ActionSheet.show(
                {
                  options: Options,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                },
                (index) => {
                  setclicked(Options[index]);
                  if (index === 0) {
                    props.MakeDefault();
                  } else if (index === 1) {
                    props.EditAddress();
                  } else if (index === 2) {
                    props.DeleteAddress();
                  }
                }
              )
            }
            color={colors.text}
          />
        </View>
      ) : null}
      <View style={styles.AddressType}>
        <AppText
          Title={props.AddressType}
          size={13}
          family="Inter"
          color="white"
        />
      </View>
    </View>
  );
}

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  OptionsBTN: {
    position: "absolute",
    top: 10,
    right: 0,
    padding: 10,
  },
  Default: {
    marginLeft: 10,
    backgroundColor: ColorPallete.primary,
    paddingLeft: 3,
    paddingRight: 3,
    letterSpacing: 1,
  },
  AddressType: {
    backgroundColor: "lightgrey",
    padding: 2,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 50,
  },
});
