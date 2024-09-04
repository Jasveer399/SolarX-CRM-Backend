/*
  Warnings:

  - A unique constraint covering the columns `[mobileNumber]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobileNumber]` on the table `SiteVisit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "paymentDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SiteVisit" ALTER COLUMN "dateOfVisit" SET DATA TYPE TEXT,
ALTER COLUMN "pic1" SET DATA TYPE TEXT,
ALTER COLUMN "pic2" SET DATA TYPE TEXT,
ALTER COLUMN "pic3" SET DATA TYPE TEXT,
ALTER COLUMN "pic4" SET DATA TYPE TEXT,
ALTER COLUMN "pic5" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mobileNumber_key" ON "Payment"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SiteVisit_mobileNumber_key" ON "SiteVisit"("mobileNumber");
