import { graphql } from "gql"

export const getAllStories = graphql(`#graphql
 query GetAllStories {
  getAllStories {
    likes {
      
      user {
        name
      }
    }
    author {
      email
      id
      name
      profileImageURL
      title
    }
    videoURL
    imageURL
    id
    createdAt
  }
}
`);