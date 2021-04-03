import React from "react";
import { StyleSheet } from "react-native";
import { Input, Item } from "native-base";

import Icon from "./Icon";

function InputBox({
  style,
  left = "ios-search",
  right = "ios-mic",
  placeholder,
  inputStyle,
  onChangeText,
  onRightPress,
  onLeftPress,
  children,
  defaultValue,
  rightColor = "black",
  leftColor = "black",
}) {
  return (
    <Item style={[styles.SearchBar, style]}>
      {left ? (
        <Icon
          Name="Ionicons"
          IconName={left}
          onPress={onLeftPress}
          color={leftColor}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <Input
        placeholder={placeholder}
        style={inputStyle}
        onChangeText={onChangeText}
        onSubmitEditing={onRightPress}
        blurOnSubmit={true}
        keyboardType="web-search"
        returnKeyType="search"
        defaultValue={defaultValue}
      />
      {right ? (
        <Icon
          Name="Ionicons"
          IconName={right}
          onPress={onRightPress}
          color={rightColor}
        />
      ) : null}
      {children}
    </Item>
  );
}

export default InputBox;

const styles = StyleSheet.create({
  SearchBar: {
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "white",
    height: 45,
  },
});
