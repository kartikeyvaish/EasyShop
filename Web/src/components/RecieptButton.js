import Text from "./Text";
import ColorPallete from "../config/ColorPallete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";

function RecieptButton({ Mime, Read, Time, Type }) {
  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 10,
        position: "absolute",
        bottom: Mime === "audio" ? 5 : 10,
        right: Mime === "audio" ? 5 : 10,
      }}
    >
      <Text
        text={Time}
        marginRight={5}
        size={13}
        color={Type === "File" ? "white" : null}
        style={{
          padding: 3,
          backgroundColor: Type === "File" ? "rgba(0,0,0,0.5)" : "transparent",
        }}
      />
      {Read === null ? null : (
        <>
          {Read ? (
            <DoneAllIcon
              style={{ color: ColorPallete.primary, fontSize: 25 }}
            />
          ) : (
            <DoneIcon style={{ color: "grey", fontSize: 25 }} />
          )}
        </>
      )}
    </div>
  );
}

export default RecieptButton;
