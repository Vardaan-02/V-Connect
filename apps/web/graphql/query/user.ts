import { graphql } from "gql";

export const verifyCredentialsTokenQuery = graphql(`#graphql
query Query($email: String!, $password: String!) {
  verifyCredentialsToken(email: $email, password: $password)
}
`)
export const getCurrentUserQuery = graphql(`#graphql
 query GetCurrentUser {
  getCurrentUser {
    id
    name
    profileImageURL
    title
    email
    posts {
      content
      likes {
        user {
          name
        }
      }
      imageURL
    }
    recommendedUsers {
      name
      title
      followers {
        profileImageURL
        name
        title
      }
      profileImageURL
    }
    following {
        name
        profileImageURL
        title
        id
    }
    followers {
      name
      title
      profileImageURL
    }
  }
}
`)
export const sendOtpEmailQuery=graphql(`#graphql
  query SendOtpEmail($email: String!, $otp: String!) {
  sendOtpEmail(email: $email, otp: $otp)
  }
`)

export const getChartDataQuery=graphql(`#graphql
  query GetChartData($userId: String!) {
  getChartData(userId: $userId) {
    monthlyData {
      shares
      name
      likes
      comments
    }
    weeklyData {
      shares
      name
      likes
      comments
    }
  }
}
`)

export const getRecentActivityQuery=graphql(`#graphql
  query GetRecentActivity($userId: String!) {
  getRecentActivity(userId: $userId) {
    action
    content
    id
    time
    user {
      username
      name
      avatar
    }
  }
}
`)

export const getAllUserQuery=graphql(`#graphql
  query GetAllUser {
  getAllUser {
    name
    profileImageURL
    title
    id
  }
}
`)