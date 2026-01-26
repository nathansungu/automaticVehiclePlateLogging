-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone_no" TEXT,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "department" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicle_id" SERIAL NOT NULL,
    "plate_no" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL DEFAULT 'CAR',
    "color" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_time" TIMESTAMP(3),
    "gate_id" INTEGER,
    "ocr_plate" TEXT,
    "confidence_score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "SystemConfig" (
    "config_id" SERIAL NOT NULL,
    "config_key" TEXT NOT NULL,
    "config_value" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("config_id")
);

-- CreateTable
CREATE TABLE "UnregisteredVehicle" (
    "unregistered_vehicle_id" SERIAL NOT NULL,
    "plate_no" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "color" TEXT,
    "ocr_plate" TEXT NOT NULL,
    "confidence_score" DOUBLE PRECISION NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gate_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnregisteredVehicle_pkey" PRIMARY KEY ("unregistered_vehicle_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_no_key" ON "User"("phone_no");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_no_key" ON "Vehicle"("plate_no");

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_config_key_key" ON "SystemConfig"("config_key");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
