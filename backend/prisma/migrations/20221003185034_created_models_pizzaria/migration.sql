-- AlterTable
ALTER TABLE "orderAccounts" ALTER COLUMN "valor_conta" DROP NOT NULL,
ALTER COLUMN "conta_comissao" DROP NOT NULL,
ALTER COLUMN "valor_comissao" DROP NOT NULL,
ALTER COLUMN "garcom" DROP NOT NULL;
