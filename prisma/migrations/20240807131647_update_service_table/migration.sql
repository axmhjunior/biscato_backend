-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_freelancer_id_fkey`;

-- AlterTable
ALTER TABLE `service` MODIFY `freelancer_id` VARCHAR(191) NOT NULL DEFAULT 'null';

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_freelancer_id_fkey` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
