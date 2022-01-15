/*
  Warnings:

  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokenResetCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenAt",
DROP COLUMN "tokenResetCount",
ADD COLUMN     "validKey" TEXT,
ADD COLUMN     "validKeyAt" TIMESTAMP(3),
ADD COLUMN     "validKeyCount" INTEGER NOT NULL DEFAULT 5;
