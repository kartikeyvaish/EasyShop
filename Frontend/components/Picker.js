import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker as PC, Icon } from "native-base";
import { useTheme } from "@react-navigation/native";

function Picker(props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        borderColor: colors.text,
        borderWidth: 1,
        borderRadius: 5,
      }}
    >
      <PC
        mode="dialog"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined, color: colors.text }}
        placeholder={props.placeholder}
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
        placeholderStyle={{ color: colors.text }}
        placeholderIconColor={colors.text}
      >
        {props.data.map((c) => (
          <PC.Item label={c.name} value={c.name} key={c.key} />
        ))}
      </PC>
    </View>
  );
}

export default Picker;

const styles = StyleSheet.create({
  container: {},
});
