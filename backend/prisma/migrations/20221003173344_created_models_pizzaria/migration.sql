/*
  Warnings:

  - Made the column `orderId` on table `contas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `contas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_orderId_fkey";

-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_userId_fkey";

-- AlterTable
ALTER TABLE "contas" ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
