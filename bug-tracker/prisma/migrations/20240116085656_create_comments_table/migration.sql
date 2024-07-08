/*
  Warnings:

  - A unique constraint covering the columns `[id,email,image,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `issueId` INTEGER NULL,
    `userEmail` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `userImage` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_email_image_name_key` ON `User`(`id`, `email`, `image`, `name`);
