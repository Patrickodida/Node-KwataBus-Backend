-- CreateTable
CREATE TABLE "BusRoute" (
    "routeId" SERIAL NOT NULL,
    "departureTown" TEXT NOT NULL,
    "arrivalTown" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "fare" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BusRoute_pkey" PRIMARY KEY ("routeId")
);

-- CreateTable
CREATE TABLE "BusService" (
    "busId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BusService_pkey" PRIMARY KEY ("busId")
);

-- CreateTable
CREATE TABLE "BusServiceRoute" (
    "busServiceRouteId" SERIAL NOT NULL,
    "busId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,

    CONSTRAINT "BusServiceRoute_pkey" PRIMARY KEY ("busServiceRouteId")
);

-- CreateTable
CREATE TABLE "Seat" (
    "seatId" SERIAL NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("seatId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "busServiceRouteId" INTEGER NOT NULL,
    "busRouteRouteId" INTEGER,
    "busServiceBusId" INTEGER,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BusServiceRoute" ADD CONSTRAINT "BusServiceRoute_busId_fkey" FOREIGN KEY ("busId") REFERENCES "BusService"("busId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusServiceRoute" ADD CONSTRAINT "BusServiceRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "BusRoute"("routeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("bookingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_busServiceRouteId_fkey" FOREIGN KEY ("busServiceRouteId") REFERENCES "BusServiceRoute"("busServiceRouteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_busRouteRouteId_fkey" FOREIGN KEY ("busRouteRouteId") REFERENCES "BusRoute"("routeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_busServiceBusId_fkey" FOREIGN KEY ("busServiceBusId") REFERENCES "BusService"("busId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
