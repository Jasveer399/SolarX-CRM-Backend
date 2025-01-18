/*
  Warnings:

  - A unique constraint covering the columns `[leadId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `Quotation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leadId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "leadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_leadId_key" ON "Project"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_projectId_key" ON "Quotation"("projectId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
