import Text from "./Text";

function ShippingAddressCard({ Address }) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
      }}
      className="layers"
    >
      <Text text={`Shipping Details`} size={15} color="grey" />
      <Text
        text={Address.Name}
        size={18}
        weight="bold"
        style={{ marginBottom: 10, marginTop: 10 }}
      />

      <Text text={Address.Address} size={15} family="Inter" />
      {Address.Locality ? (
        <Text text={Address.Locality} size={15} family="Inter" />
      ) : null}
      <Text
        text={Address.City + ", " + Address.State}
        size={15}
        family="Inter"
      />
      <Text text={`Pincode : ${Address.Pincode}`} size={15} family="Inter" />
      <Text text={Address.Phone} size={13} family="Inter" />
    </div>
  );
}

export default ShippingAddressCard;
