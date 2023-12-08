/*
  Warnings:

  - You are about to alter the column `age` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `cep` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `phoneNumber` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "age" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cep" SET DATA TYPE INTEGER,
ALTER COLUMN "phoneNumber" SET DATA TYPE INTEGER;
