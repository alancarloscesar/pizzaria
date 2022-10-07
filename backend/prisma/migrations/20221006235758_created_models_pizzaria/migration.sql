/*
  Warnings:

  - You are about to drop the column `draft` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - Added the required column `name` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "draft",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "description";
