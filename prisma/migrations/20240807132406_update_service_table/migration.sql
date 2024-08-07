-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_freelancer_id_fkey`;

-- AlterTable
ALTER TABLE `service` ALTER COLUMN `freelancer_id` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_freelancer_id_fkey` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
