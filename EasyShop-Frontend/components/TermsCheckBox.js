import React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import CheckBox from "./CheckBox";
import HyperlinkText from "./HyperlinkText";

function TermsCheckBox(props) {
  return (
    <View style={{ width: "100%" }}>
      <CheckBox
        Child={
          <Text style={styles.Terms}>
            By continuing, you agree to our
            <HyperlinkText
              Title="Terms"
              onPress={() => Linking.openURL(AppConfiguration.TermsURL)}
            />
            and that you have read our
            <HyperlinkText
              Title="Data Use Policy,"
              onPress={() => Linking.openURL(AppConfiguration.DataUsePolicyURL)}
            />
            including our
            <HyperlinkText
              Title="Cookie Use."
              onPress={() => Linking.openURL(AppConfiguration.CookieURL)}
            />
          </Text>
        }
        Text="By continuing, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use."
        OnPress={props.OnPress}
        checked={props.checked}
      />
    </View>
  );
}

export default TermsCheckBox;

const styles = StyleSheet.create({
  Terms: {
    color: "grey",
    fontSize: 12,
    fontFamily: "Inter",
  },
});
