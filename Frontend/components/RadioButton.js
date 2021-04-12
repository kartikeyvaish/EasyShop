import { Radio } from "native-base";
import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import { useTheme } from "@react-navigation/native";
import AppText from "./AppText";

function RadioButton(props) {
  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[{ flexDirection: "row" }, props.style]}>
        <Radio
          color={colors.primary}
          selectedColor={colors.primary}
          selected={props.Selected}
          onPress={props.onPress}
        />
        {props.Name ? (
          <AppText
            Title={props.Name}
            size={18}
            weight="bold"
            style={{ marginLeft: 5 }}
            onPress={props.onPress}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RadioButton;
