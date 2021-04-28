import apiClient from "./Client";

const ChatsPrefix = "/api/chats/";

const GetUserChatsEndPoint = ChatsPrefix + "GetUserChats";
const CreateChatEndPoint = ChatsPrefix + "CreateChat";
const SendMessageEndPoint = ChatsPrefix + "SendMessage";
const SendFileEndPoint = ChatsPrefix + "SendFile";
const DeleteChatEndPoint = ChatsPrefix + "DeleteChat";
const ReadAllEndPoint = ChatsPrefix + "ReadAllMessages";

const GetUserChats = (DATA: any) => apiClient.post(GetUserChatsEndPoint, DATA);
const CreateChat = (DATA: any) => apiClient.post(CreateChatEndPoint, DATA);
const SendMessage = (DATA: any) => apiClient.post(SendMessageEndPoint, DATA);
const SendFile = (DATA: any) => apiClient.post(SendFileEndPoint, DATA);
const DeleteChat = (DATA: any) => apiClient.post(DeleteChatEndPoint, DATA);
const ReadAll = (DATA: any) => apiClient.post(ReadAllEndPoint, DATA);

const EndPoints = {
  GetUserChats,
  CreateChat,
  SendMessage,
  SendFile,
  DeleteChat,
  ReadAll,
};

export default EndPoints;
