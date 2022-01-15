import { gql } from "apollo-server-core";

export default gql`
  type UserResponse {
    ok: Boolean!
    error: SimpleError
    data: User
  }

  type User {
    id: Int
    email: String!
    username: String!
    password: String!
    validKey: String
    createdAt: String!
    updatedAt: String!
  }
`;
