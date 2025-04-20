/*
  Warnings:

  - Added the required column `patientName` to the `patient_treatments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient_treatments" ADD COLUMN     "patientName" TEXT NOT NULL;
