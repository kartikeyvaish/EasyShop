import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import AppConfiguration from "../config/AppConfiguration";
import AppText from "./AppText";
import Image from "./Image";

function CategoryCard({
  Title,
  File,
  onPress,
  ImageSize = 90,
  size,
  containerSize = Dimensions.get("screen").width / 3,
  BaseURL = AppConfiguration.ImageURL,
}) {
  return (
    <View
      style={
        (styles.container, { width: containerSize, height: containerSize })
      }
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.Image}>
          <Image
            style={{
              width: ImageSize,
              height: ImageSize,
            }}
            uri={BaseURL + File}
            resizeMode={"contain"}
            preview={{ uri: BaseURL + File }}
          />
          <AppText Title={Title} size={size} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  Image: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 3,
  },
});
