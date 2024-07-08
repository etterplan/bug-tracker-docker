/*
  Warnings:

  - You are about to drop the column `boardPosition` on the `Issue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[boardId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Made the column `projectId` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `boardId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` MODIFY `projectId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `boardPosition`,
    ADD COLUMN `position` INTEGER NULL,
    ADD COLUMN `sectionId` INTEGER NULL,
    MODIFY `status` ENUM('TODO', 'OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'TODO';

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `boardId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `boardId` INTEGER NOT NULL,
    `status` ENUM('TODO', 'OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Section_boardId_idx`(`boardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Board_projectId_idx` ON `Board`(`projectId`);

-- CreateIndex
CREATE INDEX `Issue_sectionId_idx` ON `Issue`(`sectionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Project_boardId_key` ON `Project`(`boardId`);
