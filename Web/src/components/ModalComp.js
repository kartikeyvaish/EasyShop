import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
}));

function ModalComp({ children, open, handleClose }) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <div
        style={{
          width: "100%",
          height: "auto",
          maxWidth: 500,
          outline: "none",
          padding: 10,
          backgroundColor: "red",
        }}
      >
        {children}
      </div>
    </Modal>
  );
}

export default ModalComp;
