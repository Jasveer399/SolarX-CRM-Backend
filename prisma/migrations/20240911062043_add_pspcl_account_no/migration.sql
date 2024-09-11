-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "pspclAccountNo" TEXT;

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "pspclAccountNo" TEXT;

-- CreateTable
CREATE TABLE "StockManagement" (
    "id" TEXT NOT NULL,
    "subsidy" "SubSidy" NOT NULL,
    "name" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pspdlSection" TEXT NOT NULL,

    CONSTRAINT "StockManagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockManagement_mobileNumber_key" ON "StockManagement"("mobileNumber");
