-- DropForeignKey
ALTER TABLE "Subprocess" DROP CONSTRAINT "Subprocess_processId_fkey";

-- AlterTable
ALTER TABLE "Subprocess" ADD COLUMN     "parentSubId" INTEGER,
ALTER COLUMN "processId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subprocess" ADD CONSTRAINT "Subprocess_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subprocess" ADD CONSTRAINT "Subprocess_parentSubId_fkey" FOREIGN KEY ("parentSubId") REFERENCES "Subprocess"("id") ON DELETE SET NULL ON UPDATE CASCADE;
