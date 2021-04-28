import ColorPallete from "../config/ColorPallete";
import Text from "./Text";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function AddressCard({
  Name,
  Default,
  Address,
  Locality,
  City,
  State,
  Pincode,
  Phone,
  ShowOptionsIcon = true,
  onOptionsClick,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        borderWidth: 1,
        borderColor: "grey",
        borderStyle: "solid",
        position: "relative",
        borderRadius: 5,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          height: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          text={Name}
          size={20}
          marginLeft={10}
          weight="700"
          letterSpacing={1}
        />
        {Default ? (
          <Text
            text="DEFAULT"
            color="white"
            size={12}
            style={styles.Default}
            marginLeft={10}
          />
        ) : null}
      </div>

      <Text
        text={Address}
        size={16}
        marginLeft={10}
        marginBottom={5}
        family="Inter"
        wordBreak="break-word"
      />
      {Locality ? (
        <Text
          text={Locality}
          size={16}
          marginLeft={10}
          marginBottom={5}
          family="Inter"
        />
      ) : null}
      <Text
        text={City + ", " + State}
        size={16}
        marginLeft={10}
        marginBottom={5}
        family="Inter"
      />
      <Text
        text={Pincode}
        size={16}
        marginLeft={10}
        marginBottom={5}
        family="Inter"
      />
      <Text
        text={Phone}
        size={13}
        marginLeft={10}
        marginBottom={5}
        family="Inter"
      />

      {ShowOptionsIcon === true ? (
        <div
          style={{
            color: ColorPallete.primary,
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onClick={onOptionsClick}
        >
          <MoreVertIcon
            style={{ paddingLeft: 10, paddingTop: 5, fontSize: 50 }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default AddressCard;

const styles = {
  Default: {
    backgroundColor: ColorPallete.primary,
    paddingLeft: 5,
    paddingRight: 5,
  },
};
