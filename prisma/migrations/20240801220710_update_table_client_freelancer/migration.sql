/*
  Warnings:

  - You are about to drop the column `verify` on the `freelancer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `freelancer` DROP COLUMN `verify`,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
