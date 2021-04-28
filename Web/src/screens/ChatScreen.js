import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import TextField from "../components/TextInput";
import HelperFunctions from "../config/HelperFunctions";
import API from "../api/API";
import AuthContext from "../auth/context";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";
import ChatCard from "../components/ChatCard";

function ChatScreen({ history }) {
  const [Chats, SetChats] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = "EasyShop | Chats";

    GetChats();

    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetChats = async () => {
    if (authContext.User) {
      try {
        const response = await API.GetUserChats({
          _id: authContext.User._id,
        });
        if (response.ok) {
          SetChats(response.data);
        } else {
          toast.error(response.data);
        }
      } catch (error) {
        toast.error("Server Error");
      }
    } else {
      toast.error("You must be Logged in to see your chats");
    }
  };

  const DeleteChat = async () => {
    try {
    } catch (error) {}
  };

  return (
    <SingleContainer
      boxStyle={{
        flexDirection: "column",
        paddingLeft: 10,
        paddingRight: 10,
        maxWidth: 1000,
      }}
    >
      <Text text="Messages" size={25} weight="700" family="Mulish" />
      <TextField label="Search" />

      {Chats.map((item) => (
        <ChatCard
          {...item}
          key={item._id}
          onClick={() => {
            history.push({
              pathname: "/ChatRoom",
              state: {
                ...item,
                OtherUser: HelperFunctions.GetOtherUser(
                  item.Users,
                  authContext.User._id
                ),
              },
            });
          }}
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
      ))}
    </SingleContainer>
  );
}

export default ChatScreen;
