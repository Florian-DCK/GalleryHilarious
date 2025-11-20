/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `gallery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "gallery" ADD COLUMN     "date" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_password_key" ON "gallery"("password");
