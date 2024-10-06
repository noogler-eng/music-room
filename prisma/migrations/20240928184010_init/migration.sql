/*
  Warnings:

  - The primary key for the `Stream` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Upvote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_userId_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Stream_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Stream_id_seq";

-- AlterTable
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "streamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Upvote_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Upvote_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
