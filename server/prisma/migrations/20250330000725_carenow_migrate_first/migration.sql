-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100),

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100),
    "email" VARCHAR(100),
    "phone" VARCHAR(100),
    "patientId" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(10) NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_treatments" (
    "id" TEXT NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "patientId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,
    "medicationsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_treatments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatments" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medications" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contacts_patientId_idx" ON "contacts"("patientId");

-- CreateIndex
CREATE INDEX "addresses_contactId_idx" ON "addresses"("contactId");

-- CreateIndex
CREATE INDEX "patient_treatments_patientId_idx" ON "patient_treatments"("patientId");

-- CreateIndex
CREATE INDEX "patient_treatments_treatmentId_idx" ON "patient_treatments"("treatmentId");

-- CreateIndex
CREATE INDEX "patient_treatments_medicationsId_idx" ON "patient_treatments"("medicationsId");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_treatments" ADD CONSTRAINT "patient_treatments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_treatments" ADD CONSTRAINT "patient_treatments_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_treatments" ADD CONSTRAINT "patient_treatments_medicationsId_fkey" FOREIGN KEY ("medicationsId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
