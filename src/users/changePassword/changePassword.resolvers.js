import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    changePassword: async (_, { email, newPassword }) => {
      try {
        // Check the user exists.
        const { id: foundUserId } = await client.user.findUnique({
          where: { email },
          select: { id: true },
        });
        if (!foundUserId) {
          return {
            ok: false,
            error: {
              code: "404",
              message: "The user does not found.",
            },
          };
        }

        // Hashing new password.
        const dirtyPassword = await bcrypt.hash(newPassword, 10);

        // Update user password.
        const updatedUser = await client.user.update({
          where: {
            id: foundUserId,
          },
          data: {
            password: dirtyPassword,
          },
        });

        if (!updatedUser) {
          return {
            ok: false,
            error: {
              code: "400",
              message: "Failed update the user password.",
            },
          };
        }

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: "400",
            message: "Failed change password.",
          },
        };
      }
    },
  },
};
