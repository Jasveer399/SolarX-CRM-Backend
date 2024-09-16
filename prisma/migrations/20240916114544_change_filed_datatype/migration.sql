/*
  Warnings:

  - You are about to alter the column `fileSubmittedInOffice` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `processingFeePaid` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `feasibilityCleared` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `estimatePass` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `estimateFeeDeposit` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `meterDrawn` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `meterInstalled` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `consumerPictureUploaded` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `panelInverterUploaded` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `pspclInspectionClear` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `chequeUploaded` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.
  - You are about to alter the column `subsidyReleased` on the `pspcl` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(16))`.

*/
-- AlterTable
ALTER TABLE `pspcl` MODIFY `fileSubmittedInOffice` ENUM('Yse', 'No') NULL,
    MODIFY `processingFeePaid` ENUM('Yse', 'No') NULL,
    MODIFY `feasibilityCleared` ENUM('Yse', 'No') NULL,
    MODIFY `estimatePass` ENUM('Yse', 'No') NULL,
    MODIFY `estimateFeeDeposit` ENUM('Yse', 'No') NULL,
    MODIFY `meterDrawn` ENUM('Yse', 'No') NULL,
    MODIFY `meterInstalled` ENUM('Yse', 'No') NULL,
    MODIFY `consumerPictureUploaded` ENUM('Yse', 'No') NULL,
    MODIFY `panelInverterUploaded` ENUM('Yse', 'No') NULL,
    MODIFY `pspclInspectionClear` ENUM('Yse', 'No') NULL,
    MODIFY `chequeUploaded` ENUM('Yse', 'No') NULL,
    MODIFY `subsidyReleased` ENUM('Yse', 'No') NULL;
