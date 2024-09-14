-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `adminType` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leads` (
    `id` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NULL,
    `dateOfVisit` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `villageCity` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `sourceOfLead` VARCHAR(191) NULL,
    `currentSOL` ENUM('Cold', 'NoResponse', 'CallBack', 'Connected') NULL DEFAULT 'Cold',
    `callerName` VARCHAR(191) NULL,
    `assignedTo` VARCHAR(191) NULL,
    `finalStatus` ENUM('Converted', 'InProgress') NULL DEFAULT 'InProgress',
    `whatsappUrl` VARCHAR(191) NULL,
    `noteForLead` VARCHAR(191) NULL,
    `isConvertToProject` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Leads_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `dateOfLead` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `villageCity` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `assignedTo` VARCHAR(191) NOT NULL,
    `phase` VARCHAR(191) NULL,
    `pspclAccountNo` VARCHAR(191) NULL,
    `dscsSpInds` VARCHAR(191) NULL,
    `pspdlSection` VARCHAR(191) NULL,
    `solarConnectionDemand` VARCHAR(191) NULL,
    `proposedSolarLoad` DOUBLE NULL,
    `monthlyBill` VARCHAR(191) NULL,
    `monthlyUnitConsumption` VARCHAR(191) NULL,
    `positiveNegative` VARCHAR(191) NULL,
    `successRate` VARCHAR(191) NULL,
    `visitStatus` VARCHAR(191) NULL,
    `finalStatus` ENUM('Converted', 'InProgress') NULL,
    `noteForLead` VARCHAR(191) NULL,
    `isQuotation` BOOLEAN NOT NULL DEFAULT false,
    `isConvertToProject` BOOLEAN NOT NULL DEFAULT true,
    `whatsappLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `newTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Project_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotation` (
    `id` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `assignedTo` VARCHAR(191) NOT NULL,
    `phase` VARCHAR(191) NULL,
    `pspclAccountNo` VARCHAR(191) NULL,
    `villageCity` VARCHAR(191) NULL,
    `solarConnectionDemand` VARCHAR(191) NULL,
    `pspdlSection` VARCHAR(191) NULL,
    `sanLoad` DOUBLE NULL,
    `monthlyBill` DOUBLE NULL,
    `monthlyConsumption` INTEGER NULL,
    `proposedSolarLoad` DOUBLE NULL,
    `subsidy` ENUM('Subsidy', 'NoSubsidy') NULL,
    `baseAmount` DOUBLE NULL,
    `gst` DOUBLE NULL,
    `totalPrice` DOUBLE NULL,
    `pic1` VARCHAR(191) NULL,
    `pic2` VARCHAR(191) NULL,
    `pic3` VARCHAR(191) NULL,
    `pic4` VARCHAR(191) NULL,
    `pic5` VARCHAR(191) NULL,
    `isQuotation` BOOLEAN NOT NULL DEFAULT true,
    `sitevist` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Quotation_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteVisit` (
    `id` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `pspdlSection` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `villageCity` VARCHAR(191) NOT NULL,
    `assignedTo` VARCHAR(191) NOT NULL,
    `subsidy` ENUM('Subsidy', 'NoSubsidy') NULL,
    `subDivision` VARCHAR(191) NULL,
    `dateOfVisit` VARCHAR(191) NULL,
    `siteLocation` VARCHAR(191) NULL,
    `pic1` VARCHAR(191) NULL,
    `pic2` VARCHAR(191) NULL,
    `pic3` VARCHAR(191) NULL,
    `pic4` VARCHAR(191) NULL,
    `pic5` VARCHAR(191) NULL,
    `sitevist` BOOLEAN NOT NULL DEFAULT true,
    `paymentDone` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SiteVisit_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `subsidy` ENUM('Subsidy', 'NoSubsidy') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `villageCity` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `pspdlSection` VARCHAR(191) NOT NULL,
    `subsidyAmount` DOUBLE NULL,
    `netAmount` DOUBLE NULL,
    `advancePayment` DOUBLE NULL,
    `advancePaymentDate` VARCHAR(191) NULL,
    `payment1` DOUBLE NULL,
    `payment1Date` VARCHAR(191) NULL,
    `payment2` DOUBLE NULL,
    `payment2Date` VARCHAR(191) NULL,
    `payment3` DOUBLE NULL,
    `payment3Date` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `totalProjectCost` DOUBLE NULL,
    `totalAmountReceived` DOUBLE NULL,
    `subsidyAmountReceived` DOUBLE NULL,
    `paymentDone` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payment_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockManagement` (
    `id` VARCHAR(191) NOT NULL,
    `subsidy` ENUM('Subsidy', 'NoSubsidy') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `villageCity` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `pspdlSection` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StockManagement_mobileNumber_key`(`mobileNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
