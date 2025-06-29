import { graphql } from "../../gql";

export const getAllRoomsQuery = graphql(`#graphql
  query GetAllRooms {
    getAllRooms {
      id
      users {
        name
        profileImageURL
      }
      messages {
        text
        id
        reactions {
          type
          author {
            name
            profileImageURL
          }
        }
        imageURL
        createdAt
        author {
          name
          profileImageURL
        }
      }
      name
      avatar
    }
  }
`);

export const getRoomsByIdQuery = graphql(`#graphql
    query GetRoomsById {
    getRoomsById {
      users {
        name
        profileImageURL
      }
      messages {
        text
        id
        reactions {
          type
          author {
            name
            profileImageURL
          }
        }
        imageURL
        createdAt
        author {
          name
          profileImageURL
        }
      }
      name
      avatar
      id
    } 
  }
`);