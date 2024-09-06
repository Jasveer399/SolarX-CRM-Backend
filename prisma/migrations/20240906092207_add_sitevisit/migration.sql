-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "sitevist" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SiteVisit" ADD COLUMN     "sitevist" BOOLEAN NOT NULL DEFAULT true;
