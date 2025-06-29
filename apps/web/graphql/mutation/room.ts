export const CreateRoomMutation= `#graphql
mutation CreateRoom($payload: CreateRoomPayload!) {
  createRoom(payload: $payload) {
    id
  }
}
`;