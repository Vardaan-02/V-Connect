import { graphql } from "../../gql";

export const createPostMutation=graphql(`#graphql
  mutation CreatePost($payload: CreatePostData!) {
    createPost(payload: $payload) {
      id
    }
}
`);
export const createCommentMutation=graphql(`#graphql
  mutation CreateComment($payload: CreateCommentData!) {
  createComment(payload: $payload) {
    content
    id
    author {
      name
      profileImageURL
      title
    }
    imageURL
  }
}
`);
export const createReplyMutation=graphql(`#graphql
  mutation CreateReply($payload: CreateReplyData!) {
  createReply(payload: $payload) {
    content
    id
    imageURL
    author {
      name
      profileImageURL
      title
    }
  }
}
`);