import client from "../../client";

export default {
  Mutation: {
    updateValidKey: async (_, { email, validKey }) => {
      try {
        const { id, validKeyCount, validKeyAt } = await client.user.findUnique({
          where: { email },
          select: { id: true, validKeyCount: true, validKeyAt: true },
        });

        // Failed find user?
        if (!id) {
          return {
            ok: false,
            error: {
              code: "404",
              message: "The user does not found.",
            },
          };
        }

        // Check & clear valid key.
        const now = new Date();
        let newValidKeyAt = validKeyAt;
        let newValidKeyCount = validKeyCount;
        if (validKeyAt.getDate() != now.getDate()) {
          newValidKeyAt = new Date();
          newValidKeyCount = 5;
        }

        // Check valid key count.
        if (newValidKeyCount === 0) {
          return {
            ok: false,
            error: {
              code: "400",
              message: "Could not change password today anymore.",
            },
          };
        }

        // Update user.
        const updatedUserId = await client.user.update({
          where: { id },
          data: {
            validKey,
            validKeyCount:
              newValidKeyCount > 0 ? newValidKeyCount - 1 : newValidKeyCount,
            validKeyAt: newValidKeyAt,
          },
          select: { id: true },
        });

        if (!updatedUserId) {
          return {
            ok: false,
            error: {
              code: "400",
              message: "Failed update user valid key.",
            },
          };
        }

        return {
          ok: true,
        };
      } catch (error) {
        console.error("[updateValidKey]", error);
        return {
          ok: false,
          error: {
            code: "400",
            message: "Failed update user valid key.",
          },
        };
      }
    },
  },
};
