/*
  Warnings:

  - Added the required column `district` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "villageCity" TEXT;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "subsidy" "SubSidy" NOT NULL,
    "name" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pspclAccountNumber" TEXT NOT NULL,
    "subsidyAmount" DOUBLE PRECISION,
    "netAmount" DOUBLE PRECISION,
    "advancePayment" DOUBLE PRECISION,
    "advancePaymentDate" TEXT,
    "payment1" DOUBLE PRECISION,
    "payment1Date" TEXT,
    "payment2" DOUBLE PRECISION,
    "payment2Date" TEXT,
    "payment3" DOUBLE PRECISION,
    "payment3Date" TEXT,
    "email" TEXT,
    "totalProjectCost" DOUBLE PRECISION,
    "totalAmountReceived" DOUBLE PRECISION,
    "subsidyAmountReceived" DOUBLE PRECISION,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteVisit" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pspclAccountNumber" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "subDivision" TEXT,
    "dateOfVisit" TIMESTAMP(3),
    "siteLocation" TEXT,
    "pic1" BOOLEAN,
    "pic2" BOOLEAN,
    "pic3" BOOLEAN,
    "pic4" BOOLEAN,
    "pic5" BOOLEAN,

    CONSTRAINT "SiteVisit_pkey" PRIMARY KEY ("id")
);
