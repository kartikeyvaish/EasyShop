import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Alert({
  open = false,
  handleClose,
  onClick,
  alertLabel,
  placeholder,
  cancelBTNText = "No",
  agreeBTNText = "YEs",
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertLabel}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {placeholder}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelBTNText}
          </Button>
          <Button onClick={onClick} color="primary" autoFocus>
            {agreeBTNText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
