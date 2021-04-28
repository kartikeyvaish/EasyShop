import Text from "./Text";
import HelperFunctions from "../config/HelperFunctions";

function PriceBreakup({ FinalPrice = 0, Quantity = 1 }) {
  return (
    <div style={styles.container} className="layers">
      <div style={styles.PriceDetailsBox}>
        <Text text="Price Details" />
      </div>

      <div style={styles.EachBox}>
        <div style={styles.First}>
          <Text
            text={`Price (${Quantity} ${Quantity > 1 ? "items" : "item"})`}
          />
        </div>
        <div style={styles.Last}>
          <Text text={HelperFunctions.GivePrice(FinalPrice.toString())} />
        </div>
      </div>

      <div style={styles.EachBox}>
        <div style={styles.First}>
          <Text text="Delivery Charges" />
        </div>
        <div style={styles.Last}>
          <Text text="FREE" color="green" />
        </div>
      </div>

      <div style={styles.FinalAmount}>
        <div style={styles.First}>
          <Text text="Delivery Charges" />
        </div>
        <div style={styles.Last}>
          <Text
            text={HelperFunctions.GivePrice(FinalPrice.toString())}
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

export default PriceBreakup;

const styles = {
  container: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  PriceDetailsBox: {
    width: "100%",
    padding: 12,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
  },
  EachBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  First: { display: "flex", flex: 1 },
  Last: {
    display: "flex",
    flex: 1,
    flexDirection: "row-reverse",
  },
  FinalAmount: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderTopStyle: "solid",
  },
};
