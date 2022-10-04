/*
  Warnings:

  - Made the column `valor_conta` on table `orderAccounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `conta_comissao` on table `orderAccounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valor_comissao` on table `orderAccounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `garcom` on table `orderAccounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orderAccounts" ALTER COLUMN "valor_conta" SET NOT NULL,
ALTER COLUMN "conta_comissao" SET NOT NULL,
ALTER COLUMN "valor_comissao" SET NOT NULL,
ALTER COLUMN "garcom" SET NOT NULL;
