/*
  Warnings:

  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Board` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;
