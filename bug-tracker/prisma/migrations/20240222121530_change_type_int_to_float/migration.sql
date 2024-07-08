/*
  Warnings:

  - You are about to alter the column `position` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `position` DOUBLE NULL;
