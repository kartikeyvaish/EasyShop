import { useContext, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { useHistory } from "react-router-dom";

import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import DrawerCard from "../components/DrawerCard";
import Text from "../components/Text";
import TopBar from "../components/TopBar";
import Configuration from "../config/Configuration";
import { toast } from "react-toastify";
import API from "../api/API";
import ThemedDiv from "../components/ThemedDiv";

export default function SwipeableTemporaryDrawer() {
  const history = useHistory();
  const [state, setState] = useState(false);
  const { User, SetUser, CartCount } = useContext(AuthContext);

  const Logout = async () => {
    try {
      const response = await API.Logout({
        _id: User._id,
      });
      if (response.ok) {
        setState(false);
        localStorage.removeItem("AuthToken");
        SetUser(null);
        toast.success("Logged Out Successfully");
        history.replace("/");
      } else {
        setState(false);
        toast.error("Error in Logging Out");
      }
    } catch (error) {
      setState(false);
      toast.error("Error in Logging Out");
    }
  };

  const GoTo = (url) => {
    if (User === null) {
      console.log("Came here");
      navigate(`Login`);
    } else {
      navigate(url);
    }
  };

  const navigate = (url) => {
    setState(false);
    history.push(`/${url}`);
  };

  return (
    <>
      <TopBar
        openDrawer={() => setState(true)}
        HomeNavigate={() => history.replace("/")}
        showCart={User === null ? false : true}
        onClick={User === null ? null : () => GoTo("Cart")}
        BadgeCount={CartCount}
      />
      <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
        <ThemedDiv
          style={{
            width: 250,
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <div style={styles.ProfilePart} onClick={() => GoTo("Home")}>
            {User ? (
              <>
                <Avatar
                  uri={Configuration.BaseURL + User.ProfilePicture}
                  size={95}
                />
                <Text
                  text={User.Name}
                  color="white"
                  family="Mulish"
                  size={18}
                  marginTop={10}
                  marginBottom={10}
                />
                <Text
                  text={User.Email}
                  size={12}
                  weight="bold"
                  color="white"
                  marginTop={10}
                />
              </>
            ) : (
              <Text
                text="Log In"
                color="white"
                family="Mulish"
                size={18}
                marginTop={10}
                marginBottom={10}
              />
            )}
          </div>
          <DrawerCard
            title="All Categories"
            onClick={() => navigate("AllCategories")}
          />
          <DrawerCard title="My Account" onClick={() => GoTo("Profile")} />
          <DrawerCard title="My Products" onClick={() => GoTo("MyProducts")} />
          <DrawerCard title="Addresses" onClick={() => GoTo("Addresses")} />
          <DrawerCard title="Wishlist" onClick={() => GoTo("Wishlist")} />
          <DrawerCard title="My Orders" onClick={() => GoTo("Orders")} />
          <DrawerCard title="Chats" onClick={() => GoTo("Chats")} />
          <DrawerCard title="Settings" onClick={() => navigate("Settings")} />
          <DrawerCard
            title="Developers"
            onClick={() => navigate("Developers")}
          />
          {User ? <DrawerCard title="Logout" onClick={() => Logout()} /> : null}
        </ThemedDiv>
      </Drawer>
    </>
  );
}

const styles = {
  ProfilePart: {
    width: "100%",
    backgroundColor: "dodgerblue",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    paddingLeft: 20,
  },
};
