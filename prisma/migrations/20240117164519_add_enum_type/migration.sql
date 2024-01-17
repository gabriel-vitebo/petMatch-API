/*
  Warnings:

  - The `size` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energy_level` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level_of_independence` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Characteristics" AS ENUM ('LOW', 'MIDDLE', 'HIGH');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size",
ADD COLUMN     "size" "Characteristics" NOT NULL DEFAULT 'MIDDLE',
DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" "Characteristics" NOT NULL DEFAULT 'MIDDLE',
DROP COLUMN "level_of_independence",
ADD COLUMN     "level_of_independence" "Characteristics" NOT NULL DEFAULT 'MIDDLE';
