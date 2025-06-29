/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n": typeof types.CreatePostDocument,
    "#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n  createComment(payload: $payload) {\n    content\n    id\n    author {\n      name\n      profileImageURL\n      title\n    }\n    imageURL\n  }\n}\n": typeof types.CreateCommentDocument,
    "#graphql\n  mutation CreateReply($payload: CreateReplyData!) {\n  createReply(payload: $payload) {\n    content\n    id\n    imageURL\n    author {\n      name\n      profileImageURL\n      title\n    }\n  }\n}\n": typeof types.CreateReplyDocument,
    "#graphql\n  mutation CreateStory($payload: CreateStoryData!) {\n    createStory(payload: $payload) {\n      imageURL\n      videoURL\n      likes {\n        userId\n      }\n      author {\n        name\n        profileImageURL\n        title\n        id\n        email\n      }\n      id\n      createdAt\n    }\n  }\n": typeof types.CreateStoryDocument,
    "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n": typeof types.CreateCredentialsTokenDocument,
    "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n": typeof types.VerifyGoogleTokenDocument,
    "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n": typeof types.ChangePasswordDocument,
    "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": typeof types.FollowUserDocument,
    "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n": typeof types.UnfollowUserDocument,
    "#graphql\n  mutation Like($likeId: ID!, $name: String!) {\n  like(id: $likeId, name: $name)\n}\n": typeof types.LikeDocument,
    "#graphql\n  mutation Unlike($unlikeId: ID!, $name: String!) {\n  unlike(id: $unlikeId, name: $name)\n}\n": typeof types.UnlikeDocument,
    "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      videoURL\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n      comments {\n        id\n        author {\n          name\n          profileImageURL\n          id\n          email\n          title\n        }\n        likes {\n          user {\n            name\n          }\n          userId\n        }\n        content\n        imageURL\n        replies {\n          id\n          commentId\n          imageURL\n          likes {\n            user {\n              name\n            }\n          }\n          author {\n            name\n            profileImageURL\n            id\n            email\n            title\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  }\n": typeof types.GetAllPostsDocument,
    "#graphql\n  query GetSignedURLForImage($imageName: String!, $imageType: String!) {\n  getSignedUrlForImage(imageName: $imageName, imageType: $imageType)\n}\n": typeof types.GetSignedUrlForImageDocument,
    "#graphql\n  query GetSignedURLForVideo($videoName: String!, $videoType: String!) {\n  getSignedUrlForVideo(videoName: $videoName, videoType: $videoType)\n}\n": typeof types.GetSignedUrlForVideoDocument,
    "#graphql\n  query GetAllRooms {\n    getAllRooms {\n      id\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n    }\n  }\n": typeof types.GetAllRoomsDocument,
    "#graphql\n    query GetRoomsById {\n    getRoomsById {\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n      id\n    } \n  }\n": typeof types.GetRoomsByIdDocument,
    "#graphql\n query GetAllStories {\n  getAllStories {\n    likes {\n      \n      user {\n        name\n      }\n    }\n    author {\n      email\n      id\n      name\n      profileImageURL\n      title\n    }\n    videoURL\n    imageURL\n    id\n    createdAt\n  }\n}\n": typeof types.GetAllStoriesDocument,
    "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n": typeof types.QueryDocument,
    "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n": typeof types.GetCurrentUserDocument,
    "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n": typeof types.SendOtpEmailDocument,
    "#graphql\n  query GetChartData($userId: String!) {\n  getChartData(userId: $userId) {\n    monthlyData {\n      shares\n      name\n      likes\n      comments\n    }\n    weeklyData {\n      shares\n      name\n      likes\n      comments\n    }\n  }\n}\n": typeof types.GetChartDataDocument,
    "#graphql\n  query GetRecentActivity($userId: String!) {\n  getRecentActivity(userId: $userId) {\n    action\n    content\n    id\n    time\n    user {\n      username\n      name\n      avatar\n    }\n  }\n}\n": typeof types.GetRecentActivityDocument,
    "#graphql\n  query GetAllUser {\n  getAllUser {\n    name\n    profileImageURL\n    title\n    id\n  }\n}\n": typeof types.GetAllUserDocument,
};
const documents: Documents = {
    "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n": types.CreatePostDocument,
    "#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n  createComment(payload: $payload) {\n    content\n    id\n    author {\n      name\n      profileImageURL\n      title\n    }\n    imageURL\n  }\n}\n": types.CreateCommentDocument,
    "#graphql\n  mutation CreateReply($payload: CreateReplyData!) {\n  createReply(payload: $payload) {\n    content\n    id\n    imageURL\n    author {\n      name\n      profileImageURL\n      title\n    }\n  }\n}\n": types.CreateReplyDocument,
    "#graphql\n  mutation CreateStory($payload: CreateStoryData!) {\n    createStory(payload: $payload) {\n      imageURL\n      videoURL\n      likes {\n        userId\n      }\n      author {\n        name\n        profileImageURL\n        title\n        id\n        email\n      }\n      id\n      createdAt\n    }\n  }\n": types.CreateStoryDocument,
    "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n": types.CreateCredentialsTokenDocument,
    "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n": types.VerifyGoogleTokenDocument,
    "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n": types.ChangePasswordDocument,
    "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n": types.UnfollowUserDocument,
    "#graphql\n  mutation Like($likeId: ID!, $name: String!) {\n  like(id: $likeId, name: $name)\n}\n": types.LikeDocument,
    "#graphql\n  mutation Unlike($unlikeId: ID!, $name: String!) {\n  unlike(id: $unlikeId, name: $name)\n}\n": types.UnlikeDocument,
    "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      videoURL\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n      comments {\n        id\n        author {\n          name\n          profileImageURL\n          id\n          email\n          title\n        }\n        likes {\n          user {\n            name\n          }\n          userId\n        }\n        content\n        imageURL\n        replies {\n          id\n          commentId\n          imageURL\n          likes {\n            user {\n              name\n            }\n          }\n          author {\n            name\n            profileImageURL\n            id\n            email\n            title\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "#graphql\n  query GetSignedURLForImage($imageName: String!, $imageType: String!) {\n  getSignedUrlForImage(imageName: $imageName, imageType: $imageType)\n}\n": types.GetSignedUrlForImageDocument,
    "#graphql\n  query GetSignedURLForVideo($videoName: String!, $videoType: String!) {\n  getSignedUrlForVideo(videoName: $videoName, videoType: $videoType)\n}\n": types.GetSignedUrlForVideoDocument,
    "#graphql\n  query GetAllRooms {\n    getAllRooms {\n      id\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n    }\n  }\n": types.GetAllRoomsDocument,
    "#graphql\n    query GetRoomsById {\n    getRoomsById {\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n      id\n    } \n  }\n": types.GetRoomsByIdDocument,
    "#graphql\n query GetAllStories {\n  getAllStories {\n    likes {\n      \n      user {\n        name\n      }\n    }\n    author {\n      email\n      id\n      name\n      profileImageURL\n      title\n    }\n    videoURL\n    imageURL\n    id\n    createdAt\n  }\n}\n": types.GetAllStoriesDocument,
    "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n": types.QueryDocument,
    "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n": types.GetCurrentUserDocument,
    "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n": types.SendOtpEmailDocument,
    "#graphql\n  query GetChartData($userId: String!) {\n  getChartData(userId: $userId) {\n    monthlyData {\n      shares\n      name\n      likes\n      comments\n    }\n    weeklyData {\n      shares\n      name\n      likes\n      comments\n    }\n  }\n}\n": types.GetChartDataDocument,
    "#graphql\n  query GetRecentActivity($userId: String!) {\n  getRecentActivity(userId: $userId) {\n    action\n    content\n    id\n    time\n    user {\n      username\n      name\n      avatar\n    }\n  }\n}\n": types.GetRecentActivityDocument,
    "#graphql\n  query GetAllUser {\n  getAllUser {\n    name\n    profileImageURL\n    title\n    id\n  }\n}\n": types.GetAllUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n"): (typeof documents)["#graphql\n  mutation CreatePost($payload: CreatePostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n  createComment(payload: $payload) {\n    content\n    id\n    author {\n      name\n      profileImageURL\n      title\n    }\n    imageURL\n  }\n}\n"): (typeof documents)["#graphql\n  mutation CreateComment($payload: CreateCommentData!) {\n  createComment(payload: $payload) {\n    content\n    id\n    author {\n      name\n      profileImageURL\n      title\n    }\n    imageURL\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreateReply($payload: CreateReplyData!) {\n  createReply(payload: $payload) {\n    content\n    id\n    imageURL\n    author {\n      name\n      profileImageURL\n      title\n    }\n  }\n}\n"): (typeof documents)["#graphql\n  mutation CreateReply($payload: CreateReplyData!) {\n  createReply(payload: $payload) {\n    content\n    id\n    imageURL\n    author {\n      name\n      profileImageURL\n      title\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation CreateStory($payload: CreateStoryData!) {\n    createStory(payload: $payload) {\n      imageURL\n      videoURL\n      likes {\n        userId\n      }\n      author {\n        name\n        profileImageURL\n        title\n        id\n        email\n      }\n      id\n      createdAt\n    }\n  }\n"): (typeof documents)["#graphql\n  mutation CreateStory($payload: CreateStoryData!) {\n    createStory(payload: $payload) {\n      imageURL\n      videoURL\n      likes {\n        userId\n      }\n      author {\n        name\n        profileImageURL\n        title\n        id\n        email\n      }\n      id\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n"): (typeof documents)["#graphql\n mutation CreateCredentialsToken($email: String!, $password: String!, $name: String!) {\n  createCredentialsToken(email: $email, password: $password, name: $name)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n"): (typeof documents)["#graphql\n mutation VerifyGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n"): (typeof documents)["#graphql\n  mutation ChangePassword($email: String!, $newPassword: String!) {\n  changePassword(email: $email, newPassword: $newPassword)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["#graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"): (typeof documents)["#graphql\n  mutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation Like($likeId: ID!, $name: String!) {\n  like(id: $likeId, name: $name)\n}\n"): (typeof documents)["#graphql\n  mutation Like($likeId: ID!, $name: String!) {\n  like(id: $likeId, name: $name)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  mutation Unlike($unlikeId: ID!, $name: String!) {\n  unlike(id: $unlikeId, name: $name)\n}\n"): (typeof documents)["#graphql\n  mutation Unlike($unlikeId: ID!, $name: String!) {\n  unlike(id: $unlikeId, name: $name)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      videoURL\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n      comments {\n        id\n        author {\n          name\n          profileImageURL\n          id\n          email\n          title\n        }\n        likes {\n          user {\n            name\n          }\n          userId\n        }\n        content\n        imageURL\n        replies {\n          id\n          commentId\n          imageURL\n          likes {\n            user {\n              name\n            }\n          }\n          author {\n            name\n            profileImageURL\n            id\n            email\n            title\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      videoURL\n      content\n      imageURL\n      createdAt\n      updatedAt\n      author {\n        name\n        profileImageURL\n        id\n        title\n        email\n      }\n    likes {\n      user {\n        name\n      }\n      userId\n    }\n      comments {\n        id\n        author {\n          name\n          profileImageURL\n          id\n          email\n          title\n        }\n        likes {\n          user {\n            name\n          }\n          userId\n        }\n        content\n        imageURL\n        replies {\n          id\n          commentId\n          imageURL\n          likes {\n            user {\n              name\n            }\n          }\n          author {\n            name\n            profileImageURL\n            id\n            email\n            title\n          }\n          content\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSignedURLForImage($imageName: String!, $imageType: String!) {\n  getSignedUrlForImage(imageName: $imageName, imageType: $imageType)\n}\n"): (typeof documents)["#graphql\n  query GetSignedURLForImage($imageName: String!, $imageType: String!) {\n  getSignedUrlForImage(imageName: $imageName, imageType: $imageType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetSignedURLForVideo($videoName: String!, $videoType: String!) {\n  getSignedUrlForVideo(videoName: $videoName, videoType: $videoType)\n}\n"): (typeof documents)["#graphql\n  query GetSignedURLForVideo($videoName: String!, $videoType: String!) {\n  getSignedUrlForVideo(videoName: $videoName, videoType: $videoType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllRooms {\n    getAllRooms {\n      id\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetAllRooms {\n    getAllRooms {\n      id\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetRoomsById {\n    getRoomsById {\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n      id\n    } \n  }\n"): (typeof documents)["#graphql\n    query GetRoomsById {\n    getRoomsById {\n      users {\n        name\n        profileImageURL\n      }\n      messages {\n        text\n        id\n        reactions {\n          type\n          author {\n            name\n            profileImageURL\n          }\n        }\n        imageURL\n        createdAt\n        author {\n          name\n          profileImageURL\n        }\n      }\n      name\n      avatar\n      id\n    } \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n query GetAllStories {\n  getAllStories {\n    likes {\n      \n      user {\n        name\n      }\n    }\n    author {\n      email\n      id\n      name\n      profileImageURL\n      title\n    }\n    videoURL\n    imageURL\n    id\n    createdAt\n  }\n}\n"): (typeof documents)["#graphql\n query GetAllStories {\n  getAllStories {\n    likes {\n      \n      user {\n        name\n      }\n    }\n    author {\n      email\n      id\n      name\n      profileImageURL\n      title\n    }\n    videoURL\n    imageURL\n    id\n    createdAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n"): (typeof documents)["#graphql\nquery Query($email: String!, $password: String!) {\n  verifyCredentialsToken(email: $email, password: $password)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n"): (typeof documents)["#graphql\n query GetCurrentUser {\n  getCurrentUser {\n    id\n    name\n    profileImageURL\n    title\n    email\n    posts {\n      content\n      likes {\n        user {\n          name\n        }\n      }\n      imageURL\n    }\n    recommendedUsers {\n      name\n      title\n      followers {\n        profileImageURL\n        name\n        title\n      }\n      profileImageURL\n    }\n    following {\n        name\n        profileImageURL\n        title\n        id\n    }\n    followers {\n      name\n      title\n      profileImageURL\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n"): (typeof documents)["#graphql\n  query SendOtpEmail($email: String!, $otp: String!) {\n  sendOtpEmail(email: $email, otp: $otp)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetChartData($userId: String!) {\n  getChartData(userId: $userId) {\n    monthlyData {\n      shares\n      name\n      likes\n      comments\n    }\n    weeklyData {\n      shares\n      name\n      likes\n      comments\n    }\n  }\n}\n"): (typeof documents)["#graphql\n  query GetChartData($userId: String!) {\n  getChartData(userId: $userId) {\n    monthlyData {\n      shares\n      name\n      likes\n      comments\n    }\n    weeklyData {\n      shares\n      name\n      likes\n      comments\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetRecentActivity($userId: String!) {\n  getRecentActivity(userId: $userId) {\n    action\n    content\n    id\n    time\n    user {\n      username\n      name\n      avatar\n    }\n  }\n}\n"): (typeof documents)["#graphql\n  query GetRecentActivity($userId: String!) {\n  getRecentActivity(userId: $userId) {\n    action\n    content\n    id\n    time\n    user {\n      username\n      name\n      avatar\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllUser {\n  getAllUser {\n    name\n    profileImageURL\n    title\n    id\n  }\n}\n"): (typeof documents)["#graphql\n  query GetAllUser {\n  getAllUser {\n    name\n    profileImageURL\n    title\n    id\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;