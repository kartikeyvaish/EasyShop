import RadioButton from "./RadioButton";
import Text from "./Text";

function PaymentModeCard({ Name, checked, onClick }) {
  return (
    <div
      style={{
        width: "95%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <RadioButton checked={checked} />
      <Text text={Name} />
    </div>
  );
}

export default PaymentModeCard;
