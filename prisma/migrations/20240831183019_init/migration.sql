-- CreateEnum
CREATE TYPE "provider" AS ENUM ('Google');

-- CreateEnum
CREATE TYPE "streamType" AS ENUM ('Spotify', 'Youtube');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "provider" NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "type" "streamType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upvote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "streamId" INTEGER NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
