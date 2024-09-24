-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SuperAdmin', 'Subscriber', 'editor');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SuperAdmin';
