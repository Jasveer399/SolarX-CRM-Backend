/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentMode";

-- AlterTable
ALTER TABLE "PaymentReceived" ADD COLUMN     "paymentMode" "PaymentMode";
