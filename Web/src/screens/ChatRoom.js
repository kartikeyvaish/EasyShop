import { useContext, useEffect, useRef, useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";

import API from "../api/API";
import AuthContext from "../auth/context";
import ImageTopBar from "../components/ImageTopBar";
import RecievedMessage from "../components/RecievedMessage";
import HelperFunctions from "../config/HelperFunctions";
import SendMessage from "../components/SendMessage";
import SingleContainer from "../components/SingleContainer";
import Configuration from "../config/Configuration";
import ColorPallete from "../config/ColorPallete";
import ChatKeyBoard from "../components/ChatKeyBoard";
import { toast } from "react-toastify";

const SocketURL = Configuration.SocketURL;

function ChatRoom({ history }) {
  const authContext = useContext(AuthContext);
  const [Message, SetMessage] = useState("");
  const [CanPlay, SetCanPlay] = useState(true);
  const [UsersCount, SetUsersCount] = useState(0);
  const [Messages, SetMessages] = useState(history.location.state.Messages);
  const [CurrentPlaying, SetCurrentPlaying] = useState(null);
  const chatSocket = useRef();
  const InputRef = useRef();
  const FileInputRef = useRef();

  const Data = { ...history.location.state };
  const OtherUser = { ...Data.OtherUser };

  useEffect(() => {
    document.title = `EasyShop | ${OtherUser.Name}`;
    ReadAll();
    updateScroll();

    return () => SetCanPlay(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ChatBoxScroll();
  }, [Messages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    chatSocket.current = new WebSocket(
      "ws://" +
        SocketURL +
        "/ws/Chat/" +
        Data._id.toString() +
        "/" +
        authContext.User._id.toString() +
        "/"
    );

    return () => chatSocket.current.close();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (chatSocket.current) {
    chatSocket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.Type === "UsersCount") {
        if (data.UsersCount > 1) {
          OtherUserRead();
        }
        SetUsersCount(data.UsersCount);
      } else {
        if (data.From !== authContext.User._id) {
          AddToChat(data);
        }
      }
    };
  }

  const MessageToSocket = async (Data) => {
    try {
      chatSocket.current.send(JSON.stringify(Data));
    } catch (error) {}
  };

  const AddToChat = (data) => {
    SetMessage("");
    let tempArr = [...Messages];
    tempArr.push(data);
    SetMessages(tempArr);
  };

  const SendTextMessage = async () => {
    SetMessage("");
    let Time = HelperFunctions.GetCurrentTime();
    let tempID = HelperFunctions.GenerateUniqueID();
    let tempData = {
      _id: tempID,
      From: authContext.User._id,
      Message: Message,
      Type: "Text",
      Read: UsersCount > 1 ? true : false,
      Time: Time,
    };

    let Date = HelperFunctions.GetTodayDate();
    if (Messages.length === 0) {
      tempData.Date = Date;
      Data.LastMessageDate = Date;
    } else {
      if (Data.LastMessageDate === Date) {
        tempData.Date = "";
      } else {
        tempData.Date = Date;
        Data.LastMessageDate = Date;
      }
    }
    AddToChat(tempData);
    MessageToSocket(tempData);

    const bodyPost = { ...tempData, _id: history.location.state._id };

    try {
      const response = await API.SendMessage(bodyPost);
      if (response.ok) {
      } else {
        const temp = Messages.filter((c) => c._id !== tempID);
        SetMessages(temp);
        toast.error("Server Error");
      }
    } catch (error) {
      const temp = Messages.filter((c) => c._id !== tempID);
      SetMessages(temp);
      toast.error("Server Error");
    }
  };

  function updateScroll() {
    var element = document.getElementById("ChatBox");
    element.scrollTop = element.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
  }

  function ChatBoxScroll() {
    var element = document.getElementById("ChatBox");
    element.scrollTop = element.scrollHeight;
  }

  const ReadAll = async () => {
    try {
      const result = await API.ReadAll({
        _id: history.location.state._id,
        SeenBy: authContext.User._id,
      });
      SetMessages(result.data);
    } catch (error) {}
  };

  const OtherUserRead = async () => {
    try {
      let count = 0;
      let newArray = [...Messages];

      for (let i = newArray.length - 1; i >= 0; i--) {
        if (newArray[i].From.toString() === authContext.User._id.toString()) {
          if (newArray[i].Read === true) {
            break;
          } else {
            newArray[i].Read = true;
            count++;
          }
        }
      }
      if (count > 0) {
        SetMessages(newArray);
      }
    } catch (error) {}
  };

  const RenderItem = ({ item }) =>
    item.From === authContext.User._id ? (
      <SendMessage
        Message={item.Message}
        Time={item.Time}
        Date={item.Date !== "" ? item.Date : null}
        Type={item.Type}
        File={item.File}
        Mime={item.Mime}
        Read={item.Read}
        CustomFile={item.CustomFile}
        PreviewFile={item.PreviewFile}
        ProfilePicture={authContext.User.ProfilePicture}
        Name={"You"}
        onPress={() => SetCurrentPlaying(item._id)}
        CurrentPlaying={CurrentPlaying}
        key={item._id}
        _id={item._id}
        CanPlay={CanPlay}
      />
    ) : (
      <RecievedMessage
        Message={item.Message}
        Time={item.Time}
        Date={item.Date !== "" ? item.Date : null}
        Type={item.Type}
        File={item.File}
        Mime={item.Mime}
        CustomFile={item.CustomFile}
        PreviewFile={item.PreviewFile}
        ProfilePicture={OtherUser.ProfilePicture}
        Name={OtherUser.Name}
        onPress={() => SetCurrentPlaying(item._id)}
        CurrentPlaying={CurrentPlaying}
        key={item._id}
        _id={item._id}
        CanPlay={CanPlay}
      />
    );

  const PickFile = async (arr) => {
    try {
      let reader = new FileReader();
      reader.onload = function (e) {
        const mime = arr.type.slice(0, 5);
        let result = {};

        if (mime === "image" || mime === "video" || mime === "audio") {
          result = {
            type: mime,
            uri: e.target.result,
            name: result.name,
            PreviewFile: e.target.result,
            FileData: arr,
          };
          SendFileMessage(result);
        } else {
          toast.error("Invalid File Format");
        }
      };
      reader.readAsDataURL(arr);
    } catch (error) {}
  };

  function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  const SendFileMessage = async (result) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", Configuration.BaseURL + Configuration.DefaultThumbnail);
    xhr.responseType = "blob";
    xhr.onload = async function () {
      blob = xhr.response;
      var myFile = blobToFile(blob, "DefaultThumbnail.png");
      // SetLoadingText("Sending File...");
      // SetLoading(true);
      let Time = HelperFunctions.GetCurrentTime();
      let tempID = HelperFunctions.GenerateUniqueID();
      let Data = {
        _id: tempID,
        From: authContext.User._id,
        Type: "File",
        Mime: result.type,
        CustomFile: result.uri,
        PreviewFile: Configuration.BaseURL + Configuration.DefaultThumbnail,
        Read: UsersCount > 1 ? true : false,
        Time: Time,
      };
      let Date = HelperFunctions.GetTodayDate();
      if (Messages.length === 0) {
        Data.Date = Date;
        history.location.state.LastMessageDate = Date;
      } else {
        if (history.location.state.LastMessageDate === Date) {
          Data.Date = "";
        } else {
          Data.Date = Date;
          history.location.state.LastMessageDate = Date;
        }
      }
      AddToChat(Data);
      try {
        const form = new FormData();
        form.append("_id", history.location.state._id);
        form.append("From", authContext.User._id);
        form.append("Type", "File");
        form.append("Mime", result.type);
        form.append("Read", UsersCount > 1 ? true : false);
        form.append("Files", result.FileData);
        if (result.type === "image" || result.type === "video") {
          form.append("PreviewFile", myFile);
        }
        const response = await API.SendFile(form);
        if (response.ok) {
          response.data._id = tempID;
          MessageToSocket(response.data);
          // SetLoading(false);
        } else {
          const temp = Messages.filter((c) => c._id !== tempID);
          SetMessages(temp);
          // SetLoading(false);
          toast.error("Server Error");
        }
      } catch (error) {
        const temp = Messages.filter((c) => c._id !== tempID);
        SetMessages(temp);
        // SetLoading(false);
        toast.error("Server Error");
      }
    };
    xhr.send();
  };

  return (
    <SingleContainer
      boxStyle={{
        maxWidth: 1000,
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <ImageTopBar
        File={OtherUser.ProfilePicture}
        Name={OtherUser.Name}
        Status={UsersCount > 1 ? "Online" : "Offline"}
      />
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
        }}
        id="ChatBox"
        className="ChatBox"
      >
        {Messages.map((item) => RenderItem({ item }))}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <div
          style={{ display: "flex", flex: 1 }}
          onBlur={() => ChatBoxScroll()}
          onFocus={() => ChatBoxScroll()}
        >
          <ChatKeyBoard
            placeholder="Message..."
            value={Message}
            inputRef={InputRef}
            onChange={(e) => SetMessage(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "auto",
            minWidth: 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          <input
            type="file"
            ref={FileInputRef}
            style={{ display: "none" }}
            onChange={(e) => PickFile(e.target.files[0])}
          />
          <div onClick={() => FileInputRef.current.click()}>
            <AttachFileIcon style={{ color: ColorPallete.primary }} />
          </div>
          <div onClick={() => SendTextMessage()}>
            <SendIcon style={{ color: ColorPallete.primary }} />
          </div>
        </div>
      </div>
    </SingleContainer>
  );
}

export default ChatRoom;
