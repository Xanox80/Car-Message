/*
  Warnings:

  - You are about to drop the column `image` on the `Cars` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "image",
ADD COLUMN     "photo" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Photos" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Photos_pkey" PRIMARY KEY ("id")
);
