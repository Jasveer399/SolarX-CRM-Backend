/*
  Warnings:

  - A unique constraint covering the columns `[mobileNumber]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_mobileNumber_key" ON "Project"("mobileNumber");
