-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenResetCount" INTEGER NOT NULL DEFAULT 5;
