import React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";

function ModalScrollable({ visible, hideDialog, children }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.ScrollArea>{children}</Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
}

export default ModalScrollable;

const styles = StyleSheet.create({
  container: {},
});
