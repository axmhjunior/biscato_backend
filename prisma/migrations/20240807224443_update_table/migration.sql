/*
  Warnings:

  - You are about to alter the column `longitude` on the `freelancer_location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `latitude` on the `freelancer_location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `longitude` on the `user_location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `latitude` on the `user_location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `freelancer_location` MODIFY `longitude` DOUBLE NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user_location` MODIFY `longitude` DOUBLE NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL;
