import { gql } from "apollo-server-core";

export default gql`
  type UserResponse {
    ok: Boolean!
    error: SimpleError
    data: User
  }

  type User {
    email: String!
    username: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
`;
