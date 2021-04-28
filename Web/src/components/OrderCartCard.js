import Text from "./Text";
import HelperFunctions from "../config/HelperFunctions";
import Counter from "./Counter";
import Configuration from "../config/Configuration";
import Button from "./Button";
import ColorPallete from "../config/ColorPallete";

const BaseURL = Configuration.BaseURL;

function OrderCartCard({
  Title,
  Color,
  Category,
  SelectedColor,
  Price,
  Files,
  Quantity,
  Increment,
  Decrement,
  onColorChange,
  onRemove,
}) {
  const img = HelperFunctions.GiveImage(Files);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 10,
        borderColor: "lightgrey",
        borderStyle: "solid",
        borderWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 12,
      }}
      className="layers"
    >
      <div
        style={{
          width: "95%",
          height: "auto",
          minHeight: 200,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 9,
            flexDirection: "column",
          }}
        >
          <Text text={Title} size={17} />
          <Text text={"in " + Category} size={14} color="grey" />
          <Text
            text={HelperFunctions.GivePrice(Price)}
            size={17}
            color="green"
            weight="bold"
            style={{ marginTop: 20 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flex: 6,
            paddingTop: 20,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              marginBottom: 10,
            }}
          >
            <img
              src={BaseURL + img}
              width="90"
              alt="ProductIMG"
              height="90"
              style={{ objectFit: "cover" }}
            />
          </div>
          <Counter
            Quantity={Quantity}
            DecrementDisabled={Quantity < 2 ? true : null}
            IncrementDisabled={Quantity > 4 ? true : null}
            Increment={Increment}
            Decrement={Decrement}
          />
        </div>
      </div>
      <Button
        Title="Remove Product"
        capitalize={false}
        color="white"
        style={{ maxWidth: "95%" }}
        onClick={onRemove}
        backgroundColor={ColorPallete.red}
      />
    </div>
  );
}

export default OrderCartCard;
