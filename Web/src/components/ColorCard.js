import Text from "./Text";
import CancelIcon from "@material-ui/icons/Cancel";
import ColorPallete from "../config/ColorPallete";

function ColorCard({ onCancel, color = "white", Variant, Selected = false }) {
  return (
    <div
      style={{
        minWidth: 100,
        height: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginLeft: 10,
        borderColor: ColorPallete.primary,
        borderStyle: "solid",
        borderWidth: Selected === true ? 1 : 0,
      }}
    >
      {onCancel ? (
        <div
          style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 0,
            right: 10,
            color: ColorPallete.border,
          }}
          onClick={onCancel}
        >
          <CancelIcon style={{ fontSize: 30 }} />
        </div>
      ) : null}

      <div
        style={{
          width: 70,
          height: 70,
          backgroundColor: color,
          borderRadius: "50%",
          borderColor: "black",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      ></div>
      <Text text={Variant} size={13} family="Mulish" />
    </div>
  );
}

export default ColorCard;
