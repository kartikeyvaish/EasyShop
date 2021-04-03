import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import AppConfiguration from "../config/AppConfiguration";
import ColorPallete from "../config/ColorPallete";
import HelperFunctions from "../config/HelperFunctions";
import Icon from "./Icon";
import Image from "./Image";

const BaseURL = AppConfiguration.BaseURL;

const DeviceWidth = Dimensions.get("screen").width;

const RenderItem = ({ item }) => {
  let Type = HelperFunctions.GiveMimeType(item);
  if (Type === "image") {
    return (
      <Image
        style={{ width: "100%", height: "100%" }}
        resizeMode={"contain"}
        uri={BaseURL + item}
        preview={{ uri: BaseURL + item }}
      />
    );
  } else if (Type === "video") {
    return (
      <View style={styles.VideoBox}>
        <Icon
          Name="AntDesign"
          IconName="playcircleo"
          size={100}
          color="white"
        />
      </View>
    );
  } else {
    return null;
  }
};

function CarouselFiles(props) {
  const [ActiveSlide, SetActiveSlide] = useState(0);
  return (
    <>
      <View style={styles.BoxStyle}>
        <Carousel
          data={props.Files ? props.Files : []}
          renderItem={RenderItem}
          sliderWidth={DeviceWidth}
          itemWidth={DeviceWidth}
          autoplay={props.autoplay}
          loop={props.loop}
          onSnapToItem={(index) => SetActiveSlide(index)}
        />
        <Pagination
          dotsLength={(props.Files ? props.Files : []).length}
          activeDotIndex={ActiveSlide}
          containerStyle={styles.PaginationStyle}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.9}
          inactiveDotScale={0.5}
        />
      </View>
    </>
  );
}

export default CarouselFiles;

const styles = StyleSheet.create({
  BoxStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  PaginationStyle: { position: "absolute", bottom: 0 },
  inactiveDotStyle: { backgroundColor: "grey" },
  VideoBox: {
    width: "100%",
    height: "100%",
    backgroundColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
