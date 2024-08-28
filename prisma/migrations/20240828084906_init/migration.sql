-- CreateEnum
CREATE TYPE "CurrentSOL" AS ENUM ('Cold', 'NoResponse', 'CallBack', 'Connected');

-- CreateEnum
CREATE TYPE "FinalStatus" AS ENUM ('Converted', 'InProgress', 'Cold', 'Dead');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminType" TEXT NOT NULL,
    "imageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leads" (
    "id" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "dateOfVisit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "sourceOfLead" TEXT NOT NULL,
    "currentSOL" "CurrentSOL" NOT NULL,
    "callerName" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "finalStatus" "FinalStatus" NOT NULL,
    "whatsappUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Leads_mobileNumber_key" ON "Leads"("mobileNumber");
