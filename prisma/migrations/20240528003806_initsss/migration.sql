/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");
