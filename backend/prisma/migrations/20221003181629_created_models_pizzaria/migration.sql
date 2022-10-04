/*
  Warnings:

  - You are about to drop the column `data` on the `orderAccounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderAccounts" DROP COLUMN "data",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
