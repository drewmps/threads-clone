import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`;

export const REGISTER = gql`
  mutation RegisterUser($newUser: UserInput) {
    registerUser(newUser: $newUser)
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
    }
  }
`;

export const GET_PROFILE = gql`
  query GetUserById($userId: ID) {
    getUserById(userId: $userId) {
      _id
      name
      username
      email
      follower {
        username
        _id
      }
      following {
        username
        _id
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      _id
      name
      username
      email
      following {
        _id
        username
      }
      follower {
        _id
        username
      }
    }
  }
`;
