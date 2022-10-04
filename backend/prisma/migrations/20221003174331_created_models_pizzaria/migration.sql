/*
  Warnings:

  - You are about to drop the `contas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_orderId_fkey";

-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_userId_fkey";

-- DropTable
DROP TABLE "contas";

-- CreateTable
CREATE TABLE "orderAccounts" (
    "id" TEXT NOT NULL,
    "valor_conta" TEXT NOT NULL,
    "conta_comissao" TEXT NOT NULL,
    "valor_comissao" TEXT NOT NULL,
    "data" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "garcom" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "orderAccounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderAccounts" ADD CONSTRAINT "orderAccounts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderAccounts" ADD CONSTRAINT "orderAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
