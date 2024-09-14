/*
  Warnings:

  - You are about to drop the `sitevisit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sitevisit`;

-- CreateTable
CREATE TABLE `Comsumer` (
    `id` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `pspdlSection` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `villageCity` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Comsumer_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
