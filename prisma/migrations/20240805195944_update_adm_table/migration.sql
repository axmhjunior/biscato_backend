/*
  Warnings:

  - You are about to drop the column `phone` on the `administratrator` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `administratrator_phone_key` ON `administratrator`;

-- AlterTable
ALTER TABLE `administratrator` DROP COLUMN `phone`;
