-- CreateTable
CREATE TABLE "Accounting" (
    "id" TEXT NOT NULL,
    "cost" VARCHAR(255) NOT NULL,
    "mileage" VARCHAR(255) NOT NULL,
    "accident" VARCHAR(255) NOT NULL,

    CONSTRAINT "Accounting_pkey" PRIMARY KEY ("id")
);
