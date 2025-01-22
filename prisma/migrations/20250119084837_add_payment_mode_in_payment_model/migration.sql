-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('Cash', 'Cheque', 'UPI');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentMode" "PaymentMode";
