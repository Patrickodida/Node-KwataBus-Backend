/*
  Warnings:

  - You are about to drop the column `busRouteRouteId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `busServiceBusId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `busServiceRouteId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `BusServiceRoute` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `busRouteId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `busServiceId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_busRouteRouteId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_busServiceBusId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_busServiceRouteId_fkey";

-- DropForeignKey
ALTER TABLE "BusServiceRoute" DROP CONSTRAINT "BusServiceRoute_busId_fkey";

-- DropForeignKey
ALTER TABLE "BusServiceRoute" DROP CONSTRAINT "BusServiceRoute_routeId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "busRouteRouteId",
DROP COLUMN "busServiceBusId",
DROP COLUMN "busServiceRouteId",
ADD COLUMN     "busRouteId" INTEGER NOT NULL,
ADD COLUMN     "busServiceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BusServiceRoute";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_busRouteId_fkey" FOREIGN KEY ("busRouteId") REFERENCES "BusRoute"("routeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_busServiceId_fkey" FOREIGN KEY ("busServiceId") REFERENCES "BusService"("busId") ON DELETE RESTRICT ON UPDATE CASCADE;
