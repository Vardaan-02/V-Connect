import { graphql } from "../../gql";

export const getAllPostsQuery = graphql(`#graphql
  query GetAllPosts {
    getAllPosts {
      id
      videoURL
      content
      imageURL
      createdAt
      updatedAt
      author {
        name
        profileImageURL
        id
        title
        email
      }
    likes {
      user {
        name
      }
      userId
    }
      comments {
        id
        author {
          name
          profileImageURL
          id
          email
          title
        }
        likes {
          user {
            name
          }
          userId
        }
        content
        imageURL
        replies {
          id
          commentId
          imageURL
          likes {
            user {
              name
            }
          }
          author {
            name
            profileImageURL
            id
            email
            title
          }
          content
        }
        createdAt
      }
    }
  }
`);

export const getSignedUrlForImageQuery = graphql(`#graphql
  query GetSignedURLForImage($imageName: String!, $imageType: String!) {
  getSignedUrlForImage(imageName: $imageName, imageType: $imageType)
}
`);
export const getSignedUrlForVideoQuery = graphql(`#graphql
  query GetSignedURLForVideo($videoName: String!, $videoType: String!) {
  getSignedUrlForVideo(videoName: $videoName, videoType: $videoType)
}
`);