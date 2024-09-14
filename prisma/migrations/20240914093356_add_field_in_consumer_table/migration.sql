/*
  Warnings:

  - You are about to drop the column `pspdlSection` on the `comsumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comsumer` DROP COLUMN `pspdlSection`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentDone` BOOLEAN NOT NULL DEFAULT false;
