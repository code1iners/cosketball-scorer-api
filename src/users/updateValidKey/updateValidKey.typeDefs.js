import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateValidKey(email: String!, validKey: String!): SimpleResponse!
  }
`;
