/*
  Warnings:

  - You are about to drop the column `inverter` on the `Quotation` table. All the data in the column will be lost.
  - You are about to drop the column `solarPanels` on the `Quotation` table. All the data in the column will be lost.
  - You are about to drop the column `solarType` on the `Quotation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "phase" TEXT,
ALTER COLUMN "solarConnectionDemand" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "inverter",
DROP COLUMN "solarPanels",
DROP COLUMN "solarType",
ADD COLUMN     "phase" TEXT,
ADD COLUMN     "pic1" TEXT,
ADD COLUMN     "pic2" TEXT,
ADD COLUMN     "pic3" TEXT,
ADD COLUMN     "pic4" TEXT,
ADD COLUMN     "pic5" TEXT,
ADD COLUMN     "solarConnectionDemand" TEXT;

-- DropEnum
DROP TYPE "SolarType";
