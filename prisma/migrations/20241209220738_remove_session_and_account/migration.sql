/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoatCheckAdminAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_coat_check_admin_account_id_fkey";

-- DropForeignKey
ALTER TABLE "CoatCheck" DROP CONSTRAINT "CoatCheck_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_coat_check_admin_account_id_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "CoatCheckAdminAccount";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "CoatCheckAuthorityAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "CoatCheckAuthorityAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoatCheckAuthorityAccount_email_key" ON "CoatCheckAuthorityAccount"("email");

-- AddForeignKey
ALTER TABLE "CoatCheck" ADD CONSTRAINT "CoatCheck_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "CoatCheckAuthorityAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
