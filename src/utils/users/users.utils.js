import jwt from "jsonwebtoken";
import client from "../../client";

/**
 * ### Find user object by token.
 * @param {string} token User access token.
 * @returns User?
 */
export const findUserByToken = async (token) => {
  if (!token) return null;
  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  return client.user.findUnique({ where: { id } });
};

/**
 * ### Protected resolver.
 * @param {Object} reserver Reserver function.
 * @returns
 */
export const protectedResolver = (reserver) => (root, args, context, info) => {
  if (!context?.me) {
    const isQuery = info?.operation?.operation === "query";
    if (isQuery) {
      return null;
    } else {
      return {
        ok: false,
        error: {
          code: "401",
          message: "Please sign in to perform this action.",
        },
      };
    }
  }

  return reserver(root, args, context, info);
};
