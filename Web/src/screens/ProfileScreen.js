import { useContext, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";

import AuthContext from "../auth/context";
import Avatar from "../components/Avatar";
import MenuCard from "../components/MenuCard";
import Text from "../components/Text";
import Configuration from "../config/Configuration";
import ColorPallete from "../config/ColorPallete";
import SingleContainer from "../components/SingleContainer";

const BaseURL = Configuration.BaseURL;

function ProfileScreen({ history }) {
  const { User } = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SingleContainer boxStyle={styles.box}>
      <Avatar uri={BaseURL + User.ProfilePicture} size={150} marginTop={20} />

      <div onClick={() => history.push("/EditProfile")}>
        <EditIcon style={styles.EditBTN} />
      </div>

      <Text
        text={User.Name}
        marginTop={20}
        weight="700"
        family="Mulish"
        size={25}
      />

      <Text text={User.Email} marginTop={5} marginBottom={20} />

      <MenuCard MenuName="My Orders" onClick={() => history.push("/Orders")} />
      <MenuCard
        MenuName="Addresses"
        onClick={() => history.push("/Addresses")}
      />
    </SingleContainer>
  );
}

export default ProfileScreen;

const styles = {
  EditBTN: {
    position: "absolute",
    right: 25,
    top: 25,
    fontSize: 30,
    backgroundColor: ColorPallete.primary,
    borderRadius: "50%",
    color: "white",
    padding: 5,
  },
  box: {
    alignItems: "center",
    flexDirection: "column",
  },
};
