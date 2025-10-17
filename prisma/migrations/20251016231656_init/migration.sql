/*
  Warnings:

  - The `background` column on the `Study` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "background",
ADD COLUMN     "background" JSONB NOT NULL DEFAULT '{ "type" : "bg", "value": "var(--card--green)"}';
