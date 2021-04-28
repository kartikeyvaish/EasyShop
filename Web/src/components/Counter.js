import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Text from "./Text";

function Counter({
  DecrementDisabled,
  IncrementDisabled,
  Quantity = 1,
  Increment,
  Decrement,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "lightgrey",
          borderStyle: "solid",
          opacity: DecrementDisabled ? 0.5 : 1,
        }}
        className="SmallElevation"
        onClick={DecrementDisabled ? null : Decrement}
      >
        <RemoveIcon />
      </div>

      <div
        style={{
          display: "flex",
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text text={Quantity} weight="bold" family="Inter" />
      </div>

      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "lightgrey",
          borderStyle: "solid",
          opacity: IncrementDisabled ? 0.5 : 1,
        }}
        className="SmallElevation"
        onClick={IncrementDisabled ? null : Increment}
      >
        <AddIcon />
      </div>
    </div>
  );
}

export default Counter;
