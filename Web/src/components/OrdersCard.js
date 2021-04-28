import HelperFunctions from "../config/HelperFunctions";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Text from "./Text";
import Configuration from "../config/Configuration";

const BaseURL = Configuration.BaseURL;

function OrdersCard({ Files = [], Title, OrderDate, onClick, Price }) {
  let File = HelperFunctions.GiveImage(Files);
  let Date = HelperFunctions.GiveOrderDate(OrderDate);

  let DaysDifference = HelperFunctions.NumberOfDays(OrderDate);
  let DeliveryStatus = DaysDifference >= 4 ? "Delivered" : `Ordered on ${Date}`;

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        padding: 10,
      }}
      className="SmallElevation"
      onClick={onClick}
    >
      <img style={styles.Image} src={BaseURL + File} alt="ProductImage" />
      <div style={styles.DescriptionView}>
        <Text
          text={DeliveryStatus}
          style={{ marginBottom: 20 }}
          size={17}
          weight="bold"
          color="green"
          wordBreak="break-word"
        />
        <Text
          text={Title}
          style={{ marginBottom: 20 }}
          size={15}
          wordBreak="break-word"
        />
        <Text
          text={HelperFunctions.GivePrice(Price)}
          style={{ marginBottom: 20 }}
          size={15}
          color="green"
          marginTop={10}
          wordBreak="break-word"
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <KeyboardArrowRightIcon />
      </div>
    </div>
  );
}

export default OrdersCard;

const styles = {
  Image: {
    width: 100,
    height: 100,
  },
  DescriptionView: {
    paddingLeft: 20,
  },
};
