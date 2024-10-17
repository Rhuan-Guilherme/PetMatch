-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('MEMBER', 'ADMIN', 'ORG');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'MEMBER';
