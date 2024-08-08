/*
  Warnings:

  - You are about to drop the `servicecategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_freelancer_id_fkey`;

-- DropTable
DROP TABLE `servicecategory`;

-- CreateTable
CREATE TABLE `service_category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `service_category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_freelancer_id_fkey` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `service_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
