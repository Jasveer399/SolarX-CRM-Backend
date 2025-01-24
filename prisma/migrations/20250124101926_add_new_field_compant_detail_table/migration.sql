/*
  Warnings:

  - A unique constraint covering the columns `[companyName]` on the table `CompanyDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetail_companyName_key" ON "CompanyDetail"("companyName");
