/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `IssueHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `issueId` INTEGER NOT NULL,
    `action` ENUM('CREATED', 'STATUS_CHANGE', 'PRIORITY_CHANGE', 'ASSIGNEE_CHANGE', 'COMMENT_ADD', 'COMMENT_DELETE', 'COMMENT_EDIT', 'DESCRIPTION_CHANGE', 'TITLE_CHANGE') NOT NULL DEFAULT 'CREATED',
    `oldValue` VARCHAR(191) NULL,
    `newValue` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NULL,

    INDEX `IssueHistory_issueId_idx`(`issueId`),
    INDEX `IssueHistory_userId_userName_idx`(`userId`, `userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_name_key` ON `User`(`id`, `name`);
