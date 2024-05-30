/*
  Warnings:

  - You are about to alter the column `price` on the `Accommodation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `lat` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `long` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `raiting` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Accommodation" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "long" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "raiting" SET DATA TYPE DOUBLE PRECISION;
