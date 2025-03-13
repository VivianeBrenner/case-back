/*
  Warnings:

  - You are about to drop the column `area` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Process` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Process" DROP COLUMN "area",
DROP COLUMN "type",
ADD COLUMN     "areaId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documentation" TEXT,
ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now();

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
