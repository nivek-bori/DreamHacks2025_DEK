-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_male" BOOLEAN NOT NULL,
    "b_month" INTEGER NOT NULL,
    "b_year" INTEGER NOT NULL,
    "screenings" INTEGER[] DEFAULT ARRAY[]::INTEGER[]
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
