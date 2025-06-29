export interface ChatItem {
 id: string;
 name: string;
 avatar?: string;
 lastSeen?: Date;
 messages?: MessageProps[];
}
export interface Reaction {
 emoji: string;
 count: number;
 reacted: boolean;
 user:{
   name: string;
   avatar?: string;
 }
}
export interface MessageProps {
 id: string;
 content: string;
 sender: {
   name: string;
   avatar?: string;
 };
 activeChatId: string;
 imageURL?: string;
 timestamp: Date;
 reactions?: Reaction[];
 isOwnMessage?: boolean;
 onReactionAdd?: (activeChatId:string,id: string, emoji: string) => void;
 onShare?: (id: string) => void;
}
export interface User {
  __typename?: "User";
  id: string;
  name: string;
  profileImageURL?: string | null;
  title?: string | null;
  email: string;
  posts?: Array<{
    __typename?: "Post";
    content: string;
    imageURL?: string | null;
    likes?: Array<{
      __typename?: "Like";
      user?: {
        __typename?: "User";
        name: string;
      } | null;
    } | null> | null;
  } | null> | null;
  recommendedUsers?: Array<{
    __typename?: "User";
    name: string;
    title?: string | null;
    profileImageURL?: string | null;
    followers?: Array<{
      __typename?: "User";
      profileImageURL?: string | null;
      name: string;
      title?: string | null;
    } | null> | null;
  } | null> | null;
  following?: Array<{
    __typename?: "User";
    name: string;
    profileImageURL?: string | null;
    title?: string | null;
    id: string;
  } | null> | null;
  followers?: Array<{
    __typename?: "User";
    name: string;
    title?: string | null;
    profileImageURL?: string | null;
  } | null> | null;
}

export interface Room{
  __typename?: "Room";
  id: string;
  name?: string | null;
  avatar?: string | null;
  users?: Array<{
      __typename?: "User";
      name: string;
      profileImageURL?: string | null;
  } | null> | null;
  messages?: Array<{
      __typename?: "Message";
      text?: string | null;
      id: string;
      imageURL?: string | null;
      createdAt?: any | null;
      reactions?: Array<{
          __typename?: "Reaction";
          type?: string | null;
          author: {
              __typename?: "User";
              name: string;
              profileImageURL?: string | null;
          };
      } | null> | null;
      author?: {
          __typename?: "User";
          name: string;
          profileImageURL?: string | null;
      } | null;
  } | null> | null;
}[]

export interface PeerConnectionState {
  connection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isConnected: boolean;
  isInitiator: boolean;
}