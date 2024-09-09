/*
  Warnings:

  - Added the required column `assignedTo` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedTo` to the `SiteVisit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "assignedTo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SiteVisit" ADD COLUMN     "assignedTo" TEXT NOT NULL;
