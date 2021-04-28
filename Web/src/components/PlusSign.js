import AddIcon from "@material-ui/icons/Add";
import ColorPallete from "../config/ColorPallete";

function PlusSign({ onClick }) {
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
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: ColorPallete.primary,
          borderRadius: "50%",
          borderColor: "black",
          borderWidth: 1,
          borderStyle: "solid",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <AddIcon style={{ fontSize: 40 }} />
      </div>
    </div>
  );
}

export default PlusSign;
