/*
  Warnings:

  - You are about to drop the column `paymentDone` on the `comsumer` table. All the data in the column will be lost.
  - You are about to drop the column `advancePayment` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `advancePaymentDate` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `netAmount` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment1` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment1Date` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment2` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment2Date` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment3` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment3Date` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `pspdlSection` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `subsidy` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `subsidyAmount` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `subsidyAmountReceived` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comsumer` DROP COLUMN `paymentDone`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `advancePayment`,
    DROP COLUMN `advancePaymentDate`,
    DROP COLUMN `email`,
    DROP COLUMN `netAmount`,
    DROP COLUMN `payment1`,
    DROP COLUMN `payment1Date`,
    DROP COLUMN `payment2`,
    DROP COLUMN `payment2Date`,
    DROP COLUMN `payment3`,
    DROP COLUMN `payment3Date`,
    DROP COLUMN `pspdlSection`,
    DROP COLUMN `subsidy`,
    DROP COLUMN `subsidyAmount`,
    DROP COLUMN `subsidyAmountReceived`,
    ADD COLUMN `pendingAmount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `quotation` ADD COLUMN `paymentDone` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `PaymentReceived` (
    `id` VARCHAR(191) NOT NULL,
    `amountReceived` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentReceived` ADD CONSTRAINT `PaymentReceived_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
