/*
  Warnings:

  - You are about to drop the column `screenings` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "screenings",
ADD COLUMN     "appointments" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
