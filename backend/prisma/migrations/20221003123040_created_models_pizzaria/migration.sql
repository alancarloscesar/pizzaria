-- AlterTable
ALTER TABLE "items" ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "contas" (
    "id" TEXT NOT NULL,
    "valor_conta" TEXT NOT NULL,
    "conta_comissao" TEXT NOT NULL,
    "valor_comissao" TEXT NOT NULL,
    "data" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "garcom" TEXT NOT NULL,
    "orderId" TEXT,
    "userId" TEXT,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
