import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const disconnect = async () => {
  await client.$disconnect();
};

export default client;
