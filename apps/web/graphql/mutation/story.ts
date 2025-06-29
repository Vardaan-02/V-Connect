import { graphql } from "gql";

export const createStory = graphql(`#graphql
  mutation CreateStory($payload: CreateStoryData!) {
    createStory(payload: $payload) {
      imageURL
      videoURL
      likes {
        userId
      }
      author {
        name
        profileImageURL
        title
        id
        email
      }
      id
      createdAt
    }
  }
`);
