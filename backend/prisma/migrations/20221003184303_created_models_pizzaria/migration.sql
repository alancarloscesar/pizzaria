/*
  Warnings:

  - You are about to drop the column `orderId` on the `orderAccounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orderAccounts` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `orderAccounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orderAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderAccounts" DROP CONSTRAINT "orderAccounts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderAccounts" DROP CONSTRAINT "orderAccounts_userId_fkey";

-- AlterTable
ALTER TABLE "orderAccounts" DROP COLUMN "orderId",
DROP COLUMN "userId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orderAccounts" ADD CONSTRAINT "orderAccounts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderAccounts" ADD CONSTRAINT "orderAccounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
