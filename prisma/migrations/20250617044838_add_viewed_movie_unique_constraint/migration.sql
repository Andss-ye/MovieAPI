/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `ViewedMovie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ViewedMovie_userId_movieId_key" ON "ViewedMovie"("userId", "movieId");
