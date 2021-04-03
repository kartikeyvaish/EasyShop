import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

Rooms = {}


def AddToRoom(RoomName, UserID):
    if RoomName in Rooms:
        if UserID not in Rooms[RoomName]:
            Rooms[RoomName].append(UserID)
    else:
        Rooms.update({f"{RoomName}": []})
        if UserID not in Rooms[RoomName]:
            Rooms[RoomName].append(UserID)


def RemoveFromRoom(RoomName, UserID):
    if RoomName in Rooms:
        if UserID in Rooms[RoomName]:
            Rooms[RoomName].remove(UserID)


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        RoomName = self.scope['url_route']['kwargs']['room_name']
        UserID = self.scope['url_route']['kwargs']['user_id']
        self.room_name = RoomName
        self.room_group_name = 'Chat_%s' % self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        AddToRoom(RoomName, UserID)

        if RoomName in Rooms:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': "UsersCount",
                    'UsersCount': len(Rooms[RoomName])
                }
            )
        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': "UsersCount",
                    'UsersCount': 0
                }
            )

    def disconnect(self, close_code):
        RoomName = self.scope['url_route']['kwargs']['room_name']
        UserID = self.scope['url_route']['kwargs']['user_id']
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

        RemoveFromRoom(RoomName, UserID)

        if RoomName in Rooms:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': "UsersCount",
                    'UsersCount': len(Rooms[RoomName])
                }
            )
        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': "UsersCount",
                    'UsersCount': 0
                }
            )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        if text_data_json['Type'] == "Text":
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': "Text",
                    'Message': text_data_json['Message'],
                    "Date": text_data_json['Date'],
                    "From": text_data_json['From'],
                    "Read": text_data_json['Read'],
                    "Time": text_data_json['Time'],
                    "Type": text_data_json['Type'],
                    "_id": text_data_json['_id'],
                }
            )
        elif text_data_json['Type'] == "File":
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': "File",
                    'Message': text_data_json['Message'],
                    "Date": text_data_json['Date'],
                    "DateOBJ": text_data_json['DateOBJ'],
                    "File": text_data_json['File'],
                    "From": text_data_json['From'],
                    "Mime": text_data_json["Mime"],
                    "PreviewFile": text_data_json['PreviewFile'],
                    "Read": text_data_json['Read'],
                    "Time": text_data_json['Time'],
                    "Type": text_data_json['Type'],
                    "_id": text_data_json['_id'],
                }
            )

    def Text(self, event):

        self.send(text_data=json.dumps({
            'Message': event['Message'],
            "Date": event['Date'],
            "From": event['From'],
            "Read": event['Read'],
            "Time": event['Time'],
            "Type": event['Type'],
            "_id": event['_id'],
        }))

    def File(self, event):

        self.send(text_data=json.dumps({
            'Message': event['Message'],
            "Date": event['Date'],
            "DateOBJ": event['DateOBJ'],
            "File": event['File'],
            "From": event['From'],
            "Mime": event["Mime"],
            "PreviewFile": event['PreviewFile'],
            "Read": event['Read'],
            "Time": event['Time'],
            "Type": event['Type'],
            "_id": event['_id'],
        }))

    def UsersCount(self, event):

        self.send(text_data=json.dumps({
            'UsersCount': event['UsersCount'],
            "Type": 'UsersCount',
        }))
