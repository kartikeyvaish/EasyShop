import DescriptionIcon from "@material-ui/icons/Description";
import ColorPallete from "../config/ColorPallete";
import Text from "./Text";

function DownloadInvoice({ onClick }) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        borderColor: "lightgrey",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
      }}
      className="layers"
      onClick={onClick}
    >
      <DescriptionIcon style={{ color: ColorPallete.primary }} />
      <Text text="Download Invoice" marginLeft={10} />
    </div>
  );
}

export default DownloadInvoice;
