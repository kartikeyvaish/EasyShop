import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Text from "./Text";
import ColorPallete from "../config/ColorPallete";

function TopBar({
  openDrawer,
  HomeNavigate,
  showCart,
  BadgeCount = 0,
  onClick,
}) {
  return (
    <div
      style={{
        backgroundColor: ColorPallete.primary,
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 9,
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <MenuIcon onClick={openDrawer} style={{ color: "white" }} />
          <Text
            text="EasyShop"
            family="Mulish"
            color="white"
            size={25}
            weight="700"
            marginLeft={20}
            marginTop={-3}
            onClick={HomeNavigate}
          />
        </div>
        {showCart ? (
          <div
            style={{
              display: "flex",
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={onClick}
          >
            <Badge badgeContent={BadgeCount} color="error">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TopBar;
