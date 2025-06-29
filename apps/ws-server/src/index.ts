import { WebSocketServer } from "ws";
import UserService from "./services/userService";
import { User } from "./interfaces";
import RoomService from "./services/roomService";
import CallService from "./services/callservice";

const wss = new WebSocketServer({ port:8080,});

export const users:User[]=[];

wss.on("connection", async(ws,request) => {
  const url =request.url;
  if(!url){
    return;
  }
  const queryParams=new URLSearchParams(url.split("?")[1]);
  const token=queryParams.get("token")||"";
  const user=await UserService.verifyUser(token);
  const userid=user?.id;
  if(!userid){
    ws.send("Unauthorized");
    ws.close();
    return;
  }
  users.push({userid,ws,rooms:[]});
  ws.on("message", (message) => {
    const parsedData=JSON.parse(message.toString());
    if(parsedData.type==="join_room"){
      RoomService.joinRoom(parsedData.roomId,ws);
    }
    if(parsedData.type==="leave_room"){
      RoomService.leaveRoom(parsedData.roomId,ws);
    }
    if(parsedData.type==="message_in_room"){
      RoomService.msgInRoom(parsedData.roomId,ws,parsedData.message,parsedData.userId,parsedData.imageURL);
    }
    if(parsedData.type==="reaction_in_room"){
      RoomService.reactInRoom(parsedData.roomId,ws,parsedData.messageId,parsedData.reaction,parsedData.userId);
    }
    if(parsedData.type==="initiate_call"){
      CallService.initiateCall(parsedData.roomId,ws,parsedData.userId,parsedData.data);
    }
    if(parsedData.type==="answer_call"){
      CallService.answerCall(parsedData.roomId,ws,parsedData.data,parsedData.userId);
    }
    if(parsedData.type==="hangup_call"){
      CallService.hangupCall(parsedData.roomId,ws,parsedData.userId,parsedData.data);
    }
  });
}
);