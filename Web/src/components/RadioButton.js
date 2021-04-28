import Radio from "@material-ui/core/Radio";
import ColorPallete from "../config/ColorPallete";
import Text from "./Text";

function RadioButton({ onChange, value, label, checked, marginLeft }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: marginLeft,
      }}
      onClick={onChange}
    >
      <Radio
        checked={checked}
        onChange={onChange}
        value={value}
        style={{ color: ColorPallete.primary }}
      />
      <Text
        text={label}
        size={18}
        marginTop={-3}
        weight="bold"
        family="Inter"
      />
    </div>
  );
}

export default RadioButton;
