/*
  Warnings:

  - You are about to drop the column `appointments` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `b_month` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `b_year` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_male` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "appointments",
DROP COLUMN "b_month",
DROP COLUMN "b_year",
DROP COLUMN "is_male",
DROP COLUMN "name",
ADD COLUMN     "events" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
