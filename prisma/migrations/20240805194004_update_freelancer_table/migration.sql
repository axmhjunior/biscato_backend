/*
  Warnings:

  - You are about to drop the column `documentId` on the `freelancer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document_id]` on the table `freelancer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document_id` to the `freelancer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type` to the `freelancer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `freelancer_documentId_key` ON `freelancer`;

-- AlterTable
ALTER TABLE `freelancer` DROP COLUMN `documentId`,
    ADD COLUMN `document_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `document_type` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `freelancer_document_id_key` ON `freelancer`(`document_id`);
