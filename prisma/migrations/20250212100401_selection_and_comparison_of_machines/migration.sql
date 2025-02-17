-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "engine" VARCHAR(255) NOT NULL,
    "transmission" VARCHAR(255) NOT NULL,
    "drive" VARCHAR(255) NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);
