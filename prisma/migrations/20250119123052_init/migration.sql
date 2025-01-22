/*
  Warnings:

  - Added the required column `gst` to the `Comsumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gstAmount` to the `Comsumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pspclAccountNo` to the `Comsumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pspdlSection` to the `Comsumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Comsumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comsumer" ADD COLUMN     "gst" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "gstAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pspclAccountNo" TEXT NOT NULL,
ADD COLUMN     "pspdlSection" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
