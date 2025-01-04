-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "reviews" VARCHAR(255) NOT NULL,
    "advantages" VARCHAR(255) NOT NULL,
    "disadvantages" VARCHAR(255) NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);
