import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    join(email: String!, username: String!, password: String!): UserResponse
  }
`;
