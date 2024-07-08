/*
  Warnings:

  - Made the column `status` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Project` MODIFY `status` ENUM('NEW', 'ON_TRACK', 'AT_RISK', 'OFF_TRACK', 'ON_HOLD', 'COMPLETE') NOT NULL DEFAULT 'NEW';
