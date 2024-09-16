/*
  Warnings:

  - You are about to alter the column `subsidy` on the `stockmanagement` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `dateApplied` to the `StockManagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfPayment` to the `StockManagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installationDate` to the `StockManagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phase` to the `StockManagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solarConnectionDemand` to the `StockManagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subsidyReleaseDate` to the `StockManagement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockmanagement` ADD COLUMN `chequeUploaded` BOOLEAN NULL,
    ADD COLUMN `consumerPictureUploaded` BOOLEAN NULL,
    ADD COLUMN `dateApplied` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateOfPayment` DATETIME(3) NOT NULL,
    ADD COLUMN `daysElapsed` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `estimateAmount` DOUBLE NULL,
    ADD COLUMN `estimateFeeDeposit` BOOLEAN NULL,
    ADD COLUMN `estimatePass` BOOLEAN NULL,
    ADD COLUMN `feasibilityCleared` BOOLEAN NULL,
    ADD COLUMN `fileSubmittedInOffice` BOOLEAN NULL,
    ADD COLUMN `installationDate` DATETIME(3) NOT NULL,
    ADD COLUMN `jeMobileNumber` VARCHAR(191) NULL,
    ADD COLUMN `meterDrawn` BOOLEAN NULL,
    ADD COLUMN `meterInstalled` BOOLEAN NULL,
    ADD COLUMN `newAccountNumberNonSap` VARCHAR(191) NULL,
    ADD COLUMN `panelInverterUploaded` BOOLEAN NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `phase` VARCHAR(191) NOT NULL,
    ADD COLUMN `processingFeeAmount` DOUBLE NULL,
    ADD COLUMN `processingFeePaid` BOOLEAN NULL,
    ADD COLUMN `pspclAccountNumber` VARCHAR(191) NULL,
    ADD COLUMN `pspclDivision` VARCHAR(191) NULL,
    ADD COLUMN `pspclInspectionClear` BOOLEAN NULL,
    ADD COLUMN `raMobileNumber` VARCHAR(191) NULL,
    ADD COLUMN `sdoMobileNumber` VARCHAR(191) NULL,
    ADD COLUMN `solarConnectionDemand` VARCHAR(191) NOT NULL,
    ADD COLUMN `subDivisionName` VARCHAR(191) NULL,
    ADD COLUMN `subsidyReleaseDate` DATETIME(3) NOT NULL,
    ADD COLUMN `subsidyReleased` BOOLEAN NULL,
    MODIFY `subsidy` VARCHAR(191) NOT NULL;
