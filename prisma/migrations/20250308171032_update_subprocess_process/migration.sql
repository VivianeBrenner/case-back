/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Process` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Process" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "area" TEXT,
ADD COLUMN     "responsible" TEXT,
ADD COLUMN     "type" TEXT;
