import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";

import AuthContext from "../auth/context";
import AppText from "../components/AppText";
import Container from "../components/Container";
import HelperFunctions from "../config/HelperFunctions";
import InputBox from "../components/InputBox";
import RoomCard from "../components/RoomCard";
import TopBar from "../components/TopBar";
import API from "../api/API";
import Toast from "../components/Toast";

function ChatScreen({ navigation }) {
  const [Search, SetSearch] = useState("");
  const [Chats, SetChats] = useState([]);
  const [TempChats, SetTempChats] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetChats();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    return () => {};
  }, []);

  const GetChats = async () => {
    try {
      const response = await API.GetUserChats({
        _id: authContext.User._id,
      });
      if (response.ok) {
        if (JSON.stringify(response.data) === JSON.stringify(Chats)) {
        } else {
          SetChats(response.data);
        }
      } else {
        Toast.show(response.data);
      }
    } catch (error) {
      Toast.show("Server Error");
    }
  };

  const RefreshData = async () => {
    SetRefreshing(true);
    try {
      GetChats();
      SetRefreshing(false);
    } catch (error) {}
  };

  const DeleteChat = async (_id) => {
    SetLoading(true);
    try {
      const response = await API.DeleteChat({
        _id: _id,
        OwnerID: authContext.User._id,
      });
      if (response.ok) {
        const filter = Chats.filter((c) => c._id !== _id);
        SetChats(filter);
        SetLoading(false);
      } else {
        SetLoading(false);
        Toast.show("Server Error");
      }
    } catch (error) {
      SetLoading(false);
      Toast.show("Server Error");
    }
  };

  const RenderItem = ({ item }) => (
    <RoomCard
      {...item}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          ...item,
          OtherUser: HelperFunctions.GetOtherUser(
            item.Users,
            authContext.User._id
          ),
        })
      }
      TimeAgo={
        item.Messages.length
          ? HelperFunctions.TimeAgo(
              item.Messages[item.Messages.length - 1].DateOBJ
            )
          : null
      }
      onDeletePress={() => DeleteChat(item._id)}
      User={HelperFunctions.GetOtherUser(item.Users, authContext.User._id)}
    />
  );

  return (
    <Container Loading={Loading}>
      <TopBar Name="Chats" onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <InputBox
          placeholder="Search"
          inputStyle={{ fontFamily: "InterBold" }}
          left={null}
          right={null}
          onChangeText={(text) => SetSearch(text)}
          style={styles.InputBox}
        />
        <AppText
          Title="Messages"
          style={styles.MessageHeading}
          size={20}
          weight="bold"
        />
        <FlatList
          data={Chats}
          keyExtractor={(item) => item._id.toString()}
          renderItem={RenderItem}
          refreshing={Refreshing}
          onRefresh={() => RefreshData()}
        />
      </View>
    </Container>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  InputBox: {
    backgroundColor: "lightgrey",
    marginLeft: 0,
    marginRight: 0,
  },
  MessageHeading: {
    marginBottom: 15,
    marginTop: 15,
  },
});
