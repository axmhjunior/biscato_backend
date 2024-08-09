/*
  Warnings:

  - You are about to drop the column `rating` on the `freelancer` table. All the data in the column will be lost.
  - Added the required column `update_at` to the `freelancer_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `user_location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administratrator` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'ADM';

-- AlterTable
ALTER TABLE `freelancer` DROP COLUMN `rating`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'FREELANCER';

-- AlterTable
ALTER TABLE `freelancer_location` ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user_location` ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `historic` (
    `id` VARCHAR(191) NOT NULL,
    `freelancerId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historic` ADD CONSTRAINT `historic_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historic` ADD CONSTRAINT `historic_category_fkey` FOREIGN KEY (`category`) REFERENCES `service_category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historic` ADD CONSTRAINT `historic_freelancerId_fkey` FOREIGN KEY (`freelancerId`) REFERENCES `freelancer`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
