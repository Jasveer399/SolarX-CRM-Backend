/*
  Warnings:

  - You are about to drop the column `amountReceived` on the `paymentreceived` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PaymentReceived` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paymentreceived` DROP COLUMN `amountReceived`,
    ADD COLUMN `amount` DOUBLE NOT NULL;
