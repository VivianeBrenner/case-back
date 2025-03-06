-- CreateTable
CREATE TABLE "Subprocess" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "processId" INTEGER NOT NULL,

    CONSTRAINT "Subprocess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subprocess" ADD CONSTRAINT "Subprocess_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
