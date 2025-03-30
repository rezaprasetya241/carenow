/*
  Warnings:

  - You are about to drop the column `password` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `patient` table. All the data in the column will be lost.
  - Added the required column `gender` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" DROP COLUMN "password",
DROP COLUMN "token",
ADD COLUMN     "gender" VARCHAR(10) NOT NULL;
