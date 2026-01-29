/*
  Warnings:

  - You are about to drop the column `ocr_plate` on the `UnregisteredVehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UnregisteredVehicle" DROP COLUMN "ocr_plate",
ALTER COLUMN "vehicle_type" DROP NOT NULL;
