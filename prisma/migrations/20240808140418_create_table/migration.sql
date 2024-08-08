/*
  Warnings:

  - You are about to drop the `servicenotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `servicenotification` DROP FOREIGN KEY `ServiceNotification_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `servicenotification` DROP FOREIGN KEY `ServiceNotification_freelancerId_fkey`;

-- DropTable
DROP TABLE `servicenotification`;

-- CreateTable
CREATE TABLE `service_notification` (
    `id` VARCHAR(191) NOT NULL,
    `freelancerId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `service_notification` ADD CONSTRAINT `service_notification_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_notification` ADD CONSTRAINT `service_notification_freelancerId_fkey` FOREIGN KEY (`freelancerId`) REFERENCES `freelancer`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
