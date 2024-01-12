/*
  Warnings:

  - A unique constraint covering the columns `[id,email,image,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_id_email_key` ON `user`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `userImage` VARCHAR(191) NULL,
    ADD COLUMN `userName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_email_image_name_key` ON `User`(`id`, `email`, `image`, `name`);
