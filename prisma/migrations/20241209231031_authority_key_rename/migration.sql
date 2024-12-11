/*
  Warnings:

  - You are about to drop the column `authorKey` on the `CoatCheck` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoatCheck" DROP CONSTRAINT "CoatCheck_authorKey_fkey";

-- AlterTable
ALTER TABLE "CoatCheck" DROP COLUMN "authorKey",
ADD COLUMN     "authorityKey" TEXT;

-- AddForeignKey
ALTER TABLE "CoatCheck" ADD CONSTRAINT "CoatCheck_authorityKey_fkey" FOREIGN KEY ("authorityKey") REFERENCES "CoatCheckAuthorityAccount"("publicKey") ON DELETE SET NULL ON UPDATE CASCADE;
