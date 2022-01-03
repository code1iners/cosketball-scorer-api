import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      // Find user by email.
      const foundUser = await client.user.findUnique({
        where: { email },
      });

      // Check user is exists.
      if (!foundUser?.id) {
        return {
          ok: false,
          error: {
            code: "404",
            message: "The user does not found.",
          },
        };
      }

      // Password inspect.
      const isMatched = await bcrypt.compare(
        password,
        foundUser?.dirtyPassword
      );

      // Password is not correct?
      if (!isMatched) {
        return {
          ok: false,
          error: {
            code: "400",
            message: "Check your password again.",
          },
        };
      }

      // Create JWT access token.
      const token = await jwt.sign({ id }, process.env.SECRET_KEY);

      return {
        ok: true,
        token,
      };
    },
  },
};
