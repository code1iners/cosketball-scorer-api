import { gql } from "apollo-server-core";

export default gql`
  type Query {
    hello: String
  }

  type SimpleError {
    code: String
    message: String
  }

  type SimpleResponse {
    ok: Boolean!
    error: SimpleError
  }
`;
