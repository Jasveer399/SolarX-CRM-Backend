/*
  Warnings:

  - The values [BackToLeads,Quotation] on the enum `FinalStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sitevist` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDone` on the `Quotation` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FinalStatus_new" AS ENUM ('Converted', 'InProgress');
ALTER TABLE "Leads" ALTER COLUMN "finalStatus" DROP DEFAULT;
ALTER TABLE "Leads" ALTER COLUMN "finalStatus" TYPE "FinalStatus_new" USING ("finalStatus"::text::"FinalStatus_new");
ALTER TABLE "Project" ALTER COLUMN "finalStatus" TYPE "FinalStatus_new" USING ("finalStatus"::text::"FinalStatus_new");
ALTER TYPE "FinalStatus" RENAME TO "FinalStatus_old";
ALTER TYPE "FinalStatus_new" RENAME TO "FinalStatus";
DROP TYPE "FinalStatus_old";
ALTER TABLE "Leads" ALTER COLUMN "finalStatus" SET DEFAULT 'InProgress';
COMMIT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "sitevist";

-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "paymentDone",
ADD COLUMN     "sitevist" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SiteVisit" ADD COLUMN     "paymentDone" BOOLEAN NOT NULL DEFAULT false;
