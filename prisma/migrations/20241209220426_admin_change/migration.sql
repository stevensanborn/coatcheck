/*
  Warnings:

  - Made the column `publicKey` on table `CoatCheckAdminAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoatCheckAdminAccount" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "publicKey" SET NOT NULL;
