import Text from "./Text";
import HelperFunctions from "../config/HelperFunctions";
import Configuration from "../config/Configuration";

const BaseURL = Configuration.BaseURL;

function OrderDetailsCard({ Title, Seller, Price, Quantity, Files }) {
  const File = HelperFunctions.GiveImage(Files);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderRadius: 8,
      }}
      className="layers"
    >
      <div
        style={{
          display: "flex",
          flex: 3,
          flexDirection: "column",
        }}
      >
        <Text text={Title} weight="bold" />
        <Text text={`Seller : ${Seller}`} marginTop={5} />
        <Text
          marginTop={15}
          text={`${HelperFunctions.GivePrice(Price)}`}
          weight="bold"
        />
        <Text text={`Quantity : ${Quantity}`} />
      </div>
      <div
        style={{
          display: "flex",
          flex: 2,
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <img
          src={BaseURL + File}
          alt="ProductImage"
          style={{ width: 130, height: 130, objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

export default OrderDetailsCard;
