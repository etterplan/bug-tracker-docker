/*
  Warnings:

  - Added the required column `projectId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `boardId` INTEGER NULL,
    ADD COLUMN `projectId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `projectId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` ENUM('ON_TRACK', 'AT_RISK', 'OFF_TRACK', 'ON_HOLD', 'COMPLETE') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Board` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `projectId` INTEGER NOT NULL,

    UNIQUE INDEX `Board_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Comment_issueId_idx` ON `Comment`(`issueId`);

-- CreateIndex
CREATE INDEX `Comment_userId_userEmail_userImage_userName_idx` ON `Comment`(`userId`, `userEmail`, `userImage`, `userName`);

-- CreateIndex
CREATE INDEX `Issue_assignedToUserId_idx` ON `Issue`(`assignedToUserId`);

-- CreateIndex
CREATE INDEX `Issue_projectId_idx` ON `Issue`(`projectId`);

-- CreateIndex
CREATE INDEX `Issue_boardId_idx` ON `Issue`(`boardId`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);

-- CreateIndex
CREATE INDEX `User_projectId_idx` ON `User`(`projectId`);
