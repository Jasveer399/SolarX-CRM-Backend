/*
  Warnings:

  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.
  - The values [Yse] on the enum `Pspcl_subsidyReleased` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `pspcl` MODIFY `fileSubmittedInOffice` ENUM('Yes', 'No') NULL,
    MODIFY `processingFeePaid` ENUM('Yes', 'No') NULL,
    MODIFY `feasibilityCleared` ENUM('Yes', 'No') NULL,
    MODIFY `estimatePass` ENUM('Yes', 'No') NULL,
    MODIFY `estimateFeeDeposit` ENUM('Yes', 'No') NULL,
    MODIFY `meterDrawn` ENUM('Yes', 'No') NULL,
    MODIFY `meterInstalled` ENUM('Yes', 'No') NULL,
    MODIFY `consumerPictureUploaded` ENUM('Yes', 'No') NULL,
    MODIFY `panelInverterUploaded` ENUM('Yes', 'No') NULL,
    MODIFY `pspclInspectionClear` ENUM('Yes', 'No') NULL,
    MODIFY `chequeUploaded` ENUM('Yes', 'No') NULL,
    MODIFY `subsidyReleased` ENUM('Yes', 'No') NULL;
