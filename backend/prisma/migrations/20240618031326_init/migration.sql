-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "verified_email" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "fullname" TEXT,
    "avatar" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/assets-portifolio.appspot.com/o/profle-Photoroom.png?alt=media&token=44c41a6d-d29a-4a54-ac95-50cc61c11c71',
    "points" INTEGER DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emblem" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmblem" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "emblem_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserEmblem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "UserEmblem" ADD CONSTRAINT "UserEmblem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmblem" ADD CONSTRAINT "UserEmblem_emblem_id_fkey" FOREIGN KEY ("emblem_id") REFERENCES "Emblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
