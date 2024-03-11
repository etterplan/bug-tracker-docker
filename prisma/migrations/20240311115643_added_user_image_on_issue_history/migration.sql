/*
  Warnings:

  - A unique constraint covering the columns `[id,name,image]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `IssueHistory_userId_userName_idx` ON `issuehistory`;

-- DropIndex
DROP INDEX `User_id_name_key` ON `user`;

-- AlterTable
ALTER TABLE `issuehistory` ADD COLUMN `userImage` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `IssueHistory_userId_userName_userImage_idx` ON `IssueHistory`(`userId`, `userName`, `userImage`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_name_image_key` ON `User`(`id`, `name`, `image`);
