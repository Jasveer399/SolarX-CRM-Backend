/*
  Warnings:

  - Added the required column `phase` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pspclAccountNo` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pspdlSection` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solarConnectionDemand` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subsidy` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `phase` VARCHAR(191) NOT NULL,
    ADD COLUMN `pspclAccountNo` VARCHAR(191) NOT NULL,
    ADD COLUMN `pspdlSection` VARCHAR(191) NOT NULL,
    ADD COLUMN `solarConnectionDemand` VARCHAR(191) NOT NULL,
    ADD COLUMN `subsidy` ENUM('Subsidy', 'NoSubsidy') NOT NULL;
