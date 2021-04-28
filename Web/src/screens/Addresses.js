import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api/API";
import Dialog from "@material-ui/core/Dialog";
import AuthContext from "../auth/context";
import AddressCard from "../components/AddressCard";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";
import ColorPallete from "../config/ColorPallete";
import AddIcon from "@material-ui/icons/Add";
import Button from "../components/Button";
import Link from "../components/Link";

function Addresses({ history }) {
  const authContext = useContext(AuthContext);
  const [Address, SetAddresses] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [Selected, SetSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "EasyShop | Addresses";
    if (authContext.User) {
      GetAddresses();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {};
  }, []);

  const GetAddresses = async () => {
    SetLoading(true);
    try {
      const response = await API.GetAddresses({
        OwnerID: authContext.User._id,
      });
      if (response.ok) {
        SetAddresses(response.data);
        SetLoading(false);
      } else {
        SetLoading(false);
        toast.error("SERVER ERROR");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("SERVER ERROR");
    }
  };

  const DeleteAddress = async (_id) => {
    setOpen(false);
    SetLoading(true);
    try {
      const response = await API.DeleteAddress({ _id: _id });
      if (response.ok) {
        SetLoading(false);
        SetAddresses(response.data);
      } else {
        SetLoading(false);
        toast.error("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Server Error");
    }
  };

  const MakeDefault = async (_id) => {
    setOpen(false);
    SetLoading(true);
    try {
      const response = await API.MakeDefault({
        _id: _id,
      });
      if (response.ok) {
        SetLoading(false);
        SetAddresses(response.data);
      } else {
        SetLoading(false);
        toast.error("SERVER Error");
      }
    } catch (error) {
      SetLoading(false);
      toast.error("SERVER Error");
    }
  };

  return (
    <SingleContainer
      boxStyle={styles.box}
      Loading={Loading}
      LoadingText="Getting Addresses"
    >
      {authContext.User === null ? (
        <Link
          text="You need to Login to Edit your Profile"
          textDecoration="none"
          onClick={() => history.replace("/Login")}
          marginBottom={20}
        />
      ) : (
        <>
          <Text
            text="Address Book"
            size={25}
            family="Mulish"
            weight="700"
            marginTop={20}
            marginBottom={20}
          />

          <div
            style={styles.AddProductBTN}
            onClick={() => history.push("/AddAddress")}
          >
            <AddIcon style={styles.AddIcon} />
            <Text text="Add Address" marginLeft={10} />
          </div>

          {Address.map((c) => (
            <AddressCard
              {...c}
              key={c._id}
              onOptionsClick={() => {
                SetSelected(c);
                setOpen(true);
              }}
            />
          ))}

          <Dialog
            open={open}
            keepMounted
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                padding: 10,
              },
            }}
            onClose={() => setOpen(false)}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 500,
                minWidth: 225,
              }}
            >
              <Button
                Title="Make Default Address"
                capitalize={false}
                marginBottom={20}
                color="white"
                onClick={() => MakeDefault(Selected._id)}
              />

              <Button
                Title="Edit Address"
                capitalize={false}
                marginBottom={20}
                color="white"
                onClick={() => {
                  history.push({
                    pathname: "/EditAddress",
                    state: { ...Selected },
                  });
                }}
              />

              <Button
                Title="Delete Address"
                capitalize={false}
                backgroundColor={ColorPallete.red}
                color="white"
                onClick={() => DeleteAddress(Selected._id)}
              />
            </div>
          </Dialog>
        </>
      )}
    </SingleContainer>
  );
}

export default Addresses;

const styles = {
  box: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  },
  AddIcon: {
    backgroundColor: ColorPallete.primary,
    color: "white",
    borderRadius: "50%",
  },
  AddProductBTN: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: 150,
    marginBottom: 10,
  },
};
