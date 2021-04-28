import Text from "./Text";
import HelperFunctions from "../config/HelperFunctions";

function OrderProgress({ Date }) {
  let OrderDate = HelperFunctions.GiveOrderDate(Date);
  let DeliveryDate = HelperFunctions.GiveDeliveryDate(Date);
  let DaysDifference = HelperFunctions.GiveDayDifference(Date);

  let DeliveryStatus =
    DaysDifference >= 4 ? "Delivered" : `Expected to deliver before`;

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        padding: 10,
        borderRadius: 10,
      }}
      className="layers"
    >
      <Text
        text={
          (DaysDifference < 4
            ? "Expected Delivery : "
            : "Order Delivered on ") + HelperFunctions.GiveDeliveryDate(Date)
        }
        size={16}
      />

      <div
        style={{
          width: "100%",
          height: 180,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 2,
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          <Text text="Ordered" weight="bold" color="green" />
          <Text text={OrderDate} />
          <Text
            text={DeliveryStatus}
            marginTop={30}
            weight="bold"
            color={DaysDifference < 4 ? "orange" : "green"}
          />
          <Text text={DeliveryDate} />
        </div>
      </div>
    </div>
  );
}

export default OrderProgress;
