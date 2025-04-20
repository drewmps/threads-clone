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
      createdAt
      authorId
      author {
        username
      }
      likes {
        username
      }
      comments {
        username
        content
      }
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

export const CREATE_POST = gql`
  mutation CreatePost($newPost: PostInput) {
    createPost(newPost: $newPost)
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID) {
    likePost(postId: $postId)
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($postId: ID) {
    getPostById(postId: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        username
      }
      comments {
        content
        username
      }
      likes {
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_USER = gql`
  query SearchUser($keyword: String) {
    searchUser(keyword: $keyword) {
      _id
      email
      name
      username
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($newFollow: FollowInput) {
    followUser(newFollow: $newFollow)
  }
`;
