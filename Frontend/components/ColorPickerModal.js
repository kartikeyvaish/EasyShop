import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import ColorPallete from "../config/ColorPallete";
import AppText from "./AppText";

function ColorPickerModal({
  ColorProduct,
  ModalVisible,
  onBackButtonPress,
  onBackdropPress,
  onPress,
}) {
  return ColorProduct ? (
    <Modal
      isVisible={ModalVisible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
    >
      <View
        style={{
          height: "auto",
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: ColorPallete.white,
        }}
      >
        <AppText
          Title="Select Color"
          color="black"
          size={20}
          style={{ paddingLeft: 10, paddingBottom: 10 }}
        />
        <FlatList
          data={ColorProduct.Colors}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <>
              <TouchableWithoutFeedback onPress={() => onPress(item._id)}>
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  <View
                    style={{ flex: 1, backgroundColor: item.ColorInput }}
                  ></View>
                  <View
                    style={{
                      flex: 4,
                      justifyContent: "center",
                      paddingLeft: 20,
                    }}
                  >
                    <AppText
                      Title={
                        item.VariantInput ? item.VariantInput : item.ColorInput
                      }
                      size={25}
                      color="black"
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
        />
      </View>
    </Modal>
  ) : null;
}

export default ColorPickerModal;

const styles = StyleSheet.create({
  container: {},
});
