/*
  Warnings:

  - You are about to drop the `stockmanagement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `stockmanagement`;

-- CreateTable
CREATE TABLE `Pspcl` (
    `id` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `dateApplied` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `villageCity` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `subsidy` VARCHAR(191) NOT NULL,
    `phase` VARCHAR(191) NOT NULL,
    `pspdlSection` VARCHAR(191) NOT NULL,
    `solarConnectionDemand` VARCHAR(191) NOT NULL,
    `daysElapsed` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `pspclAccountNumber` VARCHAR(191) NULL,
    `newAccountNumberNonSap` VARCHAR(191) NULL,
    `fileSubmittedInOffice` BOOLEAN NULL,
    `processingFeePaid` BOOLEAN NULL,
    `processingFeeAmount` DOUBLE NULL,
    `dateOfPayment` VARCHAR(191) NULL,
    `feasibilityCleared` BOOLEAN NULL,
    `estimatePass` BOOLEAN NULL,
    `estimateFeeDeposit` BOOLEAN NULL,
    `estimateAmount` DOUBLE NULL,
    `meterDrawn` BOOLEAN NULL,
    `meterInstalled` BOOLEAN NULL,
    `installationDate` DATETIME(3) NOT NULL,
    `consumerPictureUploaded` BOOLEAN NULL,
    `panelInverterUploaded` BOOLEAN NULL,
    `pspclInspectionClear` BOOLEAN NULL,
    `chequeUploaded` BOOLEAN NULL,
    `subsidyReleased` BOOLEAN NULL,
    `subsidyReleaseDate` VARCHAR(191) NULL,
    `pspclDivision` VARCHAR(191) NULL,
    `subDivisionName` VARCHAR(191) NULL,
    `raMobileNumber` VARCHAR(191) NULL,
    `jeMobileNumber` VARCHAR(191) NULL,
    `sdoMobileNumber` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pspcl_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
