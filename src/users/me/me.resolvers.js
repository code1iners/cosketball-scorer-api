import { protectedResolver } from "../../utils/users/users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { me }) => me),
  },
};
