import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import AppText from "../components/AppText";
import Container from "../components/Container";
import AddressCard from "../components/AddressCard";
import AuthContext from "../auth/context";
import API from "../api/API";
import Toast from "../components/Toast";
import TopBar from "../components/TopBar";
import RoundButton from "../components/RoundButton";

function Addresses({ navigation }) {
  const authContext = useContext(AuthContext);
  const [Address, SetAddresses] = useState([]);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetAddresses();
    });

    return unsubscribe;
  }, [navigation]);

  const UpdateState = (data) => {
    if (JSON.stringify(data) !== JSON.stringify(Address)) {
      SetAddresses(data);
    }
    SetLoading(false);
  };

  const GetAddresses = async () => {
    SetLoading(true);
    try {
      const response = await API.GetAddresses({
        OwnerID: authContext.User._id,
      });
      if (response.ok) {
        UpdateState(response.data);
      } else {
        SetLoading(false);
        Toast.show("SERVER ERROR");
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("SERVER ERROR");
    }
  };

  const DeleteAddress = async (_id) => {
    try {
      const response = await API.DeleteAddress({ _id: _id });
      if (response.ok) {
        UpdateState(response.data);
      } else {
        Toast.show("Server Error");
      }
    } catch (error) {
      Toast.show("Server Error");
    }
  };

  const MakeDefault = async (_id) => {
    try {
      const response = await API.MakeDefault({
        _id: _id,
      });
      if (response.ok) {
        UpdateState(response.data);
      } else {
        Toast.show("SERVER Error");
      }
    } catch (error) {
      Toast.show("SERVER Error");
    }
  };

  return (
    <>
      <Container>
        <TopBar Name="Addresses" onBackPress={() => navigation.goBack()} />

        {Address ? null : (
          <AppText
            Title="No Addresses"
            size={20}
            weight="bold"
            style={{ marginLeft: 20 }}
          />
        )}

        <FlatList
          data={Address}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <AddressCard
              {...item}
              showOptions={true}
              DeleteAddress={() => DeleteAddress(item._id)}
              EditAddress={() => navigation.navigate("EditAddress", item)}
              MakeDefault={() => MakeDefault(item._id)}
            />
          )}
          refreshing={Loading}
          onRefresh={() => GetAddresses()}
        />
      </Container>

      <RoundButton
        onPress={() => navigation.navigate("NewAddress")}
        style={styles.AddBTN}
        Name={"AntDesign"}
        IconName={"plus"}
      />
    </>
  );
}

export default Addresses;

const styles = StyleSheet.create({
  TopBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 20,
  },
  AddBTN: {
    position: "absolute",
    bottom: 40,
    right: 30,
  },
});
