-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FinalStatus" ADD VALUE 'BackToLeads';
ALTER TYPE "FinalStatus" ADD VALUE 'Quotation';

-- AlterTable
ALTER TABLE "Leads" ADD COLUMN     "isConvertToProject" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isConvertToProject" BOOLEAN NOT NULL DEFAULT true;
