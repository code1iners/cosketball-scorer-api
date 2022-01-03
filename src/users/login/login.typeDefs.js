import { gql } from "apollo-server-core";

export default gql`
  type LoginResponse {
    ok: Boolean!
    token: String
    error: SimpleError
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
`;
