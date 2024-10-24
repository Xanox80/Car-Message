-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
