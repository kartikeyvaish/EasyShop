import MoreVertIcon from "@material-ui/icons/MoreVert";

import Text from "./Text";
import Configuration from "./../config/Configuration";
import HelperFunctions from "../config/HelperFunctions";
import ColorPallete from "./../config/ColorPallete";

const BaseURL = Configuration.BaseURL;

function MyProductsCard({
  item,
  showEditBTN = true,
  maxWidth = 800,
  onClick,
  onOptionsClick,
}) {
  const img = HelperFunctions.GiveImage(item.Files);

  return (
    <div
      className="layers"
      style={{
        width: "100%",
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        maxWidth: maxWidth,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderStyle: "solid",
      }}
    >
      <div
        style={{
          width: 130,
          height: 130,
          display: "flex",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <img
          src={BaseURL + img}
          alt="ProductImage"
          width="130"
          height="130"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 10,
          flexDirection: "column",
          paddingLeft: 20,
        }}
        onClick={onClick}
      >
        <Text text={item.Title} size={15} wordBreak="break-word" weight="700" />
        <Text
          text={`in ${item.Category}`}
          size={13}
          wordBreak="break-word"
          color="grey"
        />
        <Text
          text={item.Description}
          size={13}
          wordBreak="break-word"
          marginTop={5}
        />
        <Text
          text={HelperFunctions.GivePrice(item.Price)}
          size={18}
          wordBreak="break-word"
          color="green"
          weight="700"
          marginTop={20}
        />
      </div>

      {showEditBTN === true ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            color: ColorPallete.primary,
          }}
          onClick={onOptionsClick}
        >
          <MoreVertIcon
            style={{ paddingLeft: 10, paddingTop: 5, fontSize: 40 }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default MyProductsCard;
