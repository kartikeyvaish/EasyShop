import CheckBox from "./CheckBox";
import Text from "./Text";

function CheckBoxDiv({ onChange, marginTop, marginBottom }) {
  return (
    <div
      style={{
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <CheckBox onChange={onChange} />
      </div>
      <div
        style={{
          display: "flex",
          flex: 9,
        }}
      >
        <Text
          text="By continuing you accept to out Terms and that you have read our Data Use Policy jhkajhkasjdk"
          marginRight={10}
          size={15}
        />
      </div>
    </div>
  );
}

export default CheckBoxDiv;
