/*
  Warnings:

  - You are about to drop the column `create_at` on the `administratrator` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `administratrator` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `administratrator` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `administratrator` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `freelancer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `freelancer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `freelancer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `freelancer` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `freelancer` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `freelancer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `administratrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `freelancer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `administratrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `freelancer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `administratrator_name_key` ON `administratrator`;

-- DropIndex
DROP INDEX `freelancer_name_key` ON `freelancer`;

-- DropIndex
DROP INDEX `freelancer_phone_key` ON `freelancer`;

-- AlterTable
ALTER TABLE `administratrator` DROP COLUMN `create_at`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `update_at`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `freelancer` DROP COLUMN `create_at`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    DROP COLUMN `update_at`,
    DROP COLUMN `verified`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `rating` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `administratrator_user_id_key` ON `administratrator`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `freelancer_user_id_key` ON `freelancer`(`user_id`);

-- AddForeignKey
ALTER TABLE `administratrator` ADD CONSTRAINT `administratrator_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `freelancer` ADD CONSTRAINT `freelancer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
