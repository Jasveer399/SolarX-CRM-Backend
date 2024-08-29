/*
  Warnings:

  - You are about to drop the column `city` on the `Leads` table. All the data in the column will be lost.
  - Added the required column `villageCity` to the `Leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leads" DROP COLUMN "city",
ADD COLUMN     "villageCity" TEXT NOT NULL,
ALTER COLUMN "sourceOfLead" DROP NOT NULL,
ALTER COLUMN "currentSOL" DROP NOT NULL,
ALTER COLUMN "callerName" DROP NOT NULL,
ALTER COLUMN "assignedTo" DROP NOT NULL,
ALTER COLUMN "finalStatus" DROP NOT NULL,
ALTER COLUMN "whatsappUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "dscsSpInds" DROP NOT NULL,
ALTER COLUMN "pspdlSection" DROP NOT NULL,
ALTER COLUMN "solarConnectionDemand" DROP NOT NULL,
ALTER COLUMN "proposedSolarLoad" DROP NOT NULL,
ALTER COLUMN "positiveNegative" DROP NOT NULL,
ALTER COLUMN "successRate" DROP NOT NULL,
ALTER COLUMN "visitStatus" DROP NOT NULL,
ALTER COLUMN "finalStatus" DROP NOT NULL,
ALTER COLUMN "noteForLead" DROP NOT NULL,
ALTER COLUMN "whatsappLink" DROP NOT NULL;
