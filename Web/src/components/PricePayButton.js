import Button from "./Button";
import Text from "./Text";

function PricePayButton({ onClick, Price }) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        margin: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 3,
          alignItems: "center",
        }}
      >
        <Text
          text={Price}
          size={20}
          family="Mulish"
          weight="bold"
          marginLeft={10}
          color="green"
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 2,
          flexDirection: "row-reverse",
        }}
      >
        <Button
          Title="Pay"
          color="white"
          fontFamily="Inter"
          capitalize={false}
          backgroundColor="orangered"
          onClick={onClick}
          style={{ maxWidth: 150 }}
        />
      </div>
    </div>
  );
}

export default PricePayButton;
