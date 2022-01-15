import client from "../../client";

export default {
  Mutation: {
    checkValidKey: async (_, { email, validKey }) => {
      // Find match user.
      const { id } = await client.user.findFirst({
        where: {
          email,
          validKey,
        },
        select: { id: true },
      });

      if (!id) {
        return {
          ok: false,
          error: {
            code: "404",
            message: "The user does not found.",
          },
        };
      }

      return {
        ok: true,
      };
    },
  },
};
