/*
  Warnings:

  - A unique constraint covering the columns `[account_no]` on the table `final_submissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "final_submissions_account_no_key" ON "final_submissions"("account_no");
