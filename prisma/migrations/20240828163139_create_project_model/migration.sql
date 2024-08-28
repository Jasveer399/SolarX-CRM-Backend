-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "dateOfLead" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "villageCity" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "dscsSpInds" TEXT NOT NULL,
    "pspdlSection" TEXT NOT NULL,
    "solarConnectionDemand" DOUBLE PRECISION NOT NULL,
    "proposedSolarLoad" DOUBLE PRECISION NOT NULL,
    "monthlyBill" TEXT,
    "monthlyUnitConsumption" TEXT,
    "positiveNegative" TEXT NOT NULL,
    "successRate" TEXT NOT NULL,
    "visitStatus" TEXT NOT NULL,
    "finalStatus" TEXT NOT NULL,
    "noteForLead" TEXT NOT NULL,
    "whatsappLink" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
