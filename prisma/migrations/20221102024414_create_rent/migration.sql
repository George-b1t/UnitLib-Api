/*
  Warnings:

  - Added the required column `rent_limit` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "rent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    CONSTRAINT "rent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rent_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "pdf_location" TEXT,
    "rent_limit" INTEGER NOT NULL
);
INSERT INTO "new_book" ("author", "description", "genre", "id", "name", "pdf_location") SELECT "author", "description", "genre", "id", "name", "pdf_location" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_id_key" ON "book"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "rent_id_key" ON "rent"("id");
