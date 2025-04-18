import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($username: String, $password: String) {
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
