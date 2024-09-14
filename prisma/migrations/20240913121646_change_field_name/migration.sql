/*
  Warnings:

  - You are about to drop the column `sitevist` on the `quotation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comsumer` ADD COLUMN `consumer` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `quotation` DROP COLUMN `sitevist`,
    ADD COLUMN `consumer` BOOLEAN NOT NULL DEFAULT false;
