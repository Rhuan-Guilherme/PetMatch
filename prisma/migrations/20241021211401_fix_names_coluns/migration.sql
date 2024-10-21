/*
  Warnings:

  - You are about to drop the column `userId` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_userId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- DropIndex
DROP INDEX "orgs_userId_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgId",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_user_id_key" ON "orgs"("user_id");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
