/*
  Warnings:

  - You are about to drop the column `medicationsId` on the `patient_treatments` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentId` on the `patient_treatments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "patient_treatments" DROP CONSTRAINT "patient_treatments_medicationsId_fkey";

-- DropForeignKey
ALTER TABLE "patient_treatments" DROP CONSTRAINT "patient_treatments_treatmentId_fkey";

-- DropIndex
DROP INDEX "patient_treatments_medicationsId_idx";

-- DropIndex
DROP INDEX "patient_treatments_treatmentId_idx";

-- AlterTable
ALTER TABLE "patient_treatments" DROP COLUMN "medicationsId",
DROP COLUMN "treatmentId";

-- CreateTable
CREATE TABLE "_TreatmentOnPatientTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TreatmentOnPatientTreatment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MedicationOnPatientTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MedicationOnPatientTreatment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TreatmentOnPatientTreatment_B_index" ON "_TreatmentOnPatientTreatment"("B");

-- CreateIndex
CREATE INDEX "_MedicationOnPatientTreatment_B_index" ON "_MedicationOnPatientTreatment"("B");

-- AddForeignKey
ALTER TABLE "_TreatmentOnPatientTreatment" ADD CONSTRAINT "_TreatmentOnPatientTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "patient_treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentOnPatientTreatment" ADD CONSTRAINT "_TreatmentOnPatientTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicationOnPatientTreatment" ADD CONSTRAINT "_MedicationOnPatientTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "patient_treatments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicationOnPatientTreatment" ADD CONSTRAINT "_MedicationOnPatientTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
