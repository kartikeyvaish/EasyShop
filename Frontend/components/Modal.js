import React from "react";
import { StyleSheet, Modal as MODAL, TouchableOpacity } from "react-native";
function Modal({ modalVisible, hideModal, children }) {
  return (
    <>
      <MODAL
        animationType="fade"
        transparent={false}
        onRequestClose={hideModal}
        visible={modalVisible}
        statusBarTranslucent={false}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={hideModal}
          activeOpacity={1}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => null}>
            {children}
          </TouchableOpacity>
        </TouchableOpacity>
      </MODAL>
    </>
  );
}

export default Modal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
