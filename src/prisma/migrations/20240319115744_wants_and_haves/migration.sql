-- CreateTable
CREATE TABLE "_want" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_have" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_want_AB_unique" ON "_want"("A", "B");

-- CreateIndex
CREATE INDEX "_want_B_index" ON "_want"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_have_AB_unique" ON "_have"("A", "B");

-- CreateIndex
CREATE INDEX "_have_B_index" ON "_have"("B");

-- AddForeignKey
ALTER TABLE "_want" ADD CONSTRAINT "_want_A_fkey" FOREIGN KEY ("A") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_want" ADD CONSTRAINT "_want_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_have" ADD CONSTRAINT "_have_A_fkey" FOREIGN KEY ("A") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_have" ADD CONSTRAINT "_have_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
