import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const typeDefsPath = path.join(__dirname, "/**/*.typeDefs.js");
const resolversPath = path.join(__dirname, "/**/*.resolvers.js");

const loadedTypeDefs = loadFilesSync(typeDefsPath);
const loadedResolvers = loadFilesSync(resolversPath);

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(loadedResolvers);
