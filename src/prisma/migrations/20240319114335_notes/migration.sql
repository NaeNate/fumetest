-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FragranceToNote" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FragranceToNote_AB_unique" ON "_FragranceToNote"("A", "B");

-- CreateIndex
CREATE INDEX "_FragranceToNote_B_index" ON "_FragranceToNote"("B");

-- AddForeignKey
ALTER TABLE "_FragranceToNote" ADD CONSTRAINT "_FragranceToNote_A_fkey" FOREIGN KEY ("A") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FragranceToNote" ADD CONSTRAINT "_FragranceToNote_B_fkey" FOREIGN KEY ("B") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
