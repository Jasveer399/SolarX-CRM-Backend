-- CreateTable
CREATE TABLE `StockManagement` (
    `id` VARCHAR(191) NOT NULL,
    `dateOfPurchase` DATETIME(3) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `gstNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `hsnNo` VARCHAR(191) NOT NULL,
    `qty` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `rate` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `sgstPercentage` DOUBLE NOT NULL,
    `sgstAmount` DOUBLE NOT NULL,
    `cgstPercentage` DOUBLE NOT NULL,
    `cgstAmount` DOUBLE NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `stockManagementId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_stockManagementId_fkey` FOREIGN KEY (`stockManagementId`) REFERENCES `StockManagement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
