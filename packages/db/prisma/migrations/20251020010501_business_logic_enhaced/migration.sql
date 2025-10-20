-- AlterTable
ALTER TABLE "management_companies" ADD COLUMN     "address" TEXT,
ADD COLUMN     "fund_count" INTEGER,
ADD COLUMN     "majority_shareholder" TEXT,
ADD COLUMN     "total_assets_under_management" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "scpis" ADD COLUMN     "associate_count" INTEGER,
ADD COLUMN     "building_count" INTEGER,
ADD COLUMN     "occupancy_rate" DOUBLE PRECISION,
ADD COLUMN     "part_count" INTEGER,
ADD COLUMN     "part_price" DOUBLE PRECISION,
ADD COLUMN     "subscription_minimum" INTEGER,
ADD COLUMN     "tenant_count" INTEGER,
ALTER COLUMN "capitalization" DROP NOT NULL;
