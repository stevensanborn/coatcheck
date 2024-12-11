/*
  Warnings:

  - You are about to drop the column `authorId` on the `CoatCheck` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicKey]` on the table `CoatCheckAuthorityAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CoatCheck" DROP CONSTRAINT "CoatCheck_authorId_fkey";

-- AlterTable
ALTER TABLE "CoatCheck" DROP COLUMN "authorId",
ADD COLUMN     "authorKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CoatCheckAuthorityAccount_publicKey_key" ON "CoatCheckAuthorityAccount"("publicKey");

-- AddForeignKey
ALTER TABLE "CoatCheck" ADD CONSTRAINT "CoatCheck_authorKey_fkey" FOREIGN KEY ("authorKey") REFERENCES "CoatCheckAuthorityAccount"("publicKey") ON DELETE SET NULL ON UPDATE CASCADE;
