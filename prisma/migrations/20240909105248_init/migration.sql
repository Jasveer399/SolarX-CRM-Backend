/*
  Warnings:

  - You are about to drop the column `pspclAccountNumber` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `pspclAccountNumber` on the `Quotation` table. All the data in the column will be lost.
  - You are about to drop the column `pspclAccountNumber` on the `SiteVisit` table. All the data in the column will be lost.
  - Added the required column `pspdlSection` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pspdlSection` to the `SiteVisit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "pspclAccountNumber",
ADD COLUMN     "pspdlSection" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "pspclAccountNumber",
ADD COLUMN     "pspdlSection" TEXT;

-- AlterTable
ALTER TABLE "SiteVisit" DROP COLUMN "pspclAccountNumber",
ADD COLUMN     "pspdlSection" TEXT NOT NULL;
