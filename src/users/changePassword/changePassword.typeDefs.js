import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    changePassword(email: String!, newPassword: String!): SimpleResponse!
  }
`;
