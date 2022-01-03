import client from "../../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    join: async (_, { email, username, password }) => {
      // Check email is unique.
      const isEmailExists = await client.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (isEmailExists) {
        return {
          ok: false,
          error: {
            code: "409",
            message: "The email already exists.",
          },
        };
      }

      // Check username is unique.
      const isUsernameExists = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (isUsernameExists) {
        return {
          ok: false,
          error: {
            code: "409",
            message: "The username already exists.",
          },
        };
      }

      // Password hash.
      const dirtyPassword = await bcrypt.hash(password, 10);

      const createdUser = await client.user.create({
        data: {
          email,
          username,
          password: dirtyPassword,
        },
      });

      return {
        ok: true,
        data: createdUser,
      };
    },
  },
};
