/*
  Warnings:

  - Added the required column `date` to the `patient_treatments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient_treatments" ADD COLUMN     "date" TEXT NOT NULL;
