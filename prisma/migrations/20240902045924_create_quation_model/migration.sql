/*
  Warnings:

  - The values [Cold,Dead] on the enum `FinalStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `finalStatus` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubSidy" AS ENUM ('Subsidy', 'NoSubsidy');

-- CreateEnum
CREATE TYPE "SolarType" AS ENUM ('Residential', 'Commercial', 'Industrial');

-- AlterEnum
BEGIN;
CREATE TYPE "FinalStatus_new" AS ENUM ('Converted', 'InProgress');
ALTER TABLE "Leads" ALTER COLUMN "finalStatus" TYPE "FinalStatus_new" USING ("finalStatus"::text::"FinalStatus_new");
ALTER TABLE "Project" ALTER COLUMN "finalStatus" TYPE "FinalStatus_new" USING ("finalStatus"::text::"FinalStatus_new");
ALTER TYPE "FinalStatus" RENAME TO "FinalStatus_old";
ALTER TYPE "FinalStatus_new" RENAME TO "FinalStatus";
DROP TYPE "FinalStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "finalStatus",
ADD COLUMN     "finalStatus" "FinalStatus";

-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "solarType" "SolarType",
    "pspclAccountNumber" TEXT,
    "sanLoad" DOUBLE PRECISION,
    "monthlyBill" DOUBLE PRECISION,
    "monthlyConsumption" INTEGER,
    "proposedSolarLoad" DOUBLE PRECISION,
    "subsidy" "SubSidy",
    "solarPanels" INTEGER,
    "inverter" DOUBLE PRECISION,
    "baseAmount" DOUBLE PRECISION,
    "gst" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_mobileNumber_key" ON "Quotation"("mobileNumber");
