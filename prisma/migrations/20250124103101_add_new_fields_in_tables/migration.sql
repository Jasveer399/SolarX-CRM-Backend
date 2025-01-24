/*
  Warnings:

  - A unique constraint covering the columns `[companyGST]` on the table `CompanyDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetail_companyGST_key" ON "CompanyDetail"("companyGST");
