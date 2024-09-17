-- CreateEnum
CREATE TYPE "CurrentSOL" AS ENUM ('Cold', 'NoResponse', 'CallBack', 'Connected');

-- CreateEnum
CREATE TYPE "FinalStatus" AS ENUM ('Converted', 'InProgress');

-- CreateEnum
CREATE TYPE "SubSidy" AS ENUM ('Subsidy', 'NoSubsidy');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminType" TEXT NOT NULL,
    "imageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leads" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "dateOfVisit" TEXT,
    "name" TEXT,
    "villageCity" TEXT,
    "district" TEXT,
    "state" TEXT,
    "sourceOfLead" TEXT,
    "currentSOL" "CurrentSOL" DEFAULT 'Cold',
    "callerName" TEXT,
    "assignedTo" TEXT,
    "finalStatus" "FinalStatus" DEFAULT 'InProgress',
    "whatsappUrl" TEXT,
    "noteForLead" TEXT,
    "isConvertToProject" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "dateOfLead" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "phase" TEXT,
    "pspclAccountNo" TEXT,
    "dscsSpInds" TEXT,
    "pspdlSection" TEXT,
    "solarConnectionDemand" TEXT,
    "proposedSolarLoad" DOUBLE PRECISION,
    "monthlyBill" TEXT,
    "monthlyUnitConsumption" TEXT,
    "positiveNegative" TEXT,
    "successRate" TEXT,
    "visitStatus" TEXT,
    "finalStatus" "FinalStatus",
    "noteForLead" TEXT,
    "isQuotation" BOOLEAN NOT NULL DEFAULT false,
    "isConvertToProject" BOOLEAN NOT NULL DEFAULT true,
    "whatsappLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "newTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "phase" TEXT,
    "pspclAccountNo" TEXT,
    "villageCity" TEXT,
    "solarConnectionDemand" TEXT,
    "pspdlSection" TEXT,
    "sanLoad" DOUBLE PRECISION,
    "monthlyBill" DOUBLE PRECISION,
    "monthlyConsumption" INTEGER,
    "proposedSolarLoad" DOUBLE PRECISION,
    "subsidy" "SubSidy",
    "baseAmount" DOUBLE PRECISION,
    "gst" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION,
    "pic1" TEXT,
    "pic2" TEXT,
    "pic3" TEXT,
    "pic4" TEXT,
    "pic5" TEXT,
    "isQuotation" BOOLEAN NOT NULL DEFAULT true,
    "consumer" BOOLEAN NOT NULL DEFAULT false,
    "paymentDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comsumer" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "consumer" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comsumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "subsidy" "SubSidy" NOT NULL,
    "pspclAccountNo" TEXT NOT NULL,
    "pspdlSection" TEXT NOT NULL,
    "solarConnectionDemand" TEXT NOT NULL,
    "totalProjectCost" DOUBLE PRECISION,
    "totalAmountReceived" DOUBLE PRECISION,
    "pendingAmount" DOUBLE PRECISION,
    "paymentStatus" TEXT NOT NULL DEFAULT 'Payment Panding',
    "paymentDone" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentReceived" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "PaymentReceived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pspcl" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "subsidy" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "pspdlSection" TEXT NOT NULL,
    "solarConnectionDemand" TEXT NOT NULL,
    "dateApplied" TEXT,
    "daysElapsed" TEXT,
    "email" TEXT,
    "password" TEXT,
    "pspclAccountNumber" TEXT,
    "newAccountNumberNonSap" TEXT,
    "fileSubmittedInOffice" "YesNo",
    "processingFeePaid" "YesNo",
    "processingFeeAmount" DOUBLE PRECISION,
    "dateOfPayment" TEXT,
    "feasibilityCleared" "YesNo",
    "estimatePass" "YesNo",
    "estimateFeeDeposit" "YesNo",
    "estimateAmount" DOUBLE PRECISION,
    "meterDrawn" "YesNo",
    "meterInstalled" "YesNo",
    "installationDate" TEXT,
    "consumerPictureUploaded" "YesNo",
    "panelInverterUploaded" "YesNo",
    "pspclInspectionClear" "YesNo",
    "chequeUploaded" "YesNo",
    "subsidyReleased" "YesNo",
    "subsidyReleaseDate" TEXT,
    "pspclDivision" TEXT,
    "subDivisionName" TEXT,
    "raMobileNumber" TEXT,
    "jeMobileNumber" TEXT,
    "sdoMobileNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pspcl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyDetail" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyGST" TEXT NOT NULL,

    CONSTRAINT "CompanyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockManagement" (
    "id" TEXT NOT NULL,
    "dateOfPurchase" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "gstNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockManagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT,
    "hsnNo" TEXT,
    "qty" DOUBLE PRECISION,
    "unit" TEXT,
    "rate" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION,
    "sgstPercentage" DOUBLE PRECISION,
    "sgstAmount" DOUBLE PRECISION,
    "cgstPercentage" DOUBLE PRECISION,
    "cgstAmount" DOUBLE PRECISION,
    "totalAmount" DOUBLE PRECISION,
    "stockManagementId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Leads_mobileNumber_key" ON "Leads"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Project_mobileNumber_key" ON "Project"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_mobileNumber_key" ON "Quotation"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Comsumer_mobileNumber_key" ON "Comsumer"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mobileNumber_key" ON "Payment"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Pspcl_mobileNumber_key" ON "Pspcl"("mobileNumber");

-- AddForeignKey
ALTER TABLE "PaymentReceived" ADD CONSTRAINT "PaymentReceived_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_stockManagementId_fkey" FOREIGN KEY ("stockManagementId") REFERENCES "StockManagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
