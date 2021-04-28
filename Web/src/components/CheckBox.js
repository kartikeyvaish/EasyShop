import Checkbox from "@material-ui/core/Checkbox";
import ColorPallete from "../config/ColorPallete";

export default function CheckBox({ onChange, checked }) {
  return (
    <div>
      <Checkbox
        onChange={onChange}
        checked={checked}
        style={{ color: ColorPallete.primary }}
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  );
}
