import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    checkValidKey(email: String!, validKey: String!): SimpleResponse!
  }
`;
