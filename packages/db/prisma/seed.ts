import { faker } from "@faker-js/faker";
import argon2 from "argon2";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting the seeding process...");

  // ----------------------------------------
  // 1. TEARDOWN PHASE
  // ----------------------------------------
  console.log("🧹 Clearing existing data...");
  await prisma.sCPI.deleteMany();
  console.log("   - SCPIs deleted.");
  await prisma.managementCompany.deleteMany();
  console.log("   - Management Companies deleted.");
  await prisma.user.deleteMany();
  console.log("   - Users, Sessions, and Accounts deleted.");

  console.log("👤 Seeding admin users...");
  const adminUsersData = [
    { email: "admin1@test.com", name: "Super Admin" },
    { email: "admin2@test.com", name: "Content Manager" },
  ];
  const plainTextPassword = "Password123!";

  for (const userData of adminUsersData) {
    const hashedPassword = await argon2.hash(plainTextPassword);
    await prisma.user.create({
      data: {
        ...userData,
        hashedPassword: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });
  }
  console.log(
    `   - ${adminUsersData.length} admin users created with password: "${plainTextPassword}"`,
  );

  console.log("🏢 Seeding management companies...");
  const companiesToCreate = Array.from({ length: 10 }).map(() => ({
    name: `${faker.company.name()} AM`,
    description: faker.company.catchPhrase(),
    logoUrl: faker.image.url({ width: 200, height: 200 }),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}`,
    totalAssetsUnderManagement: faker.number.float({
      min: 500,
      max: 5000,
      multipleOf: 100,
    }), // In M€
    fundCount: faker.number.int({ min: 1, max: 10 }),
    majorityShareholder: faker.company.name(),
  }));

  await prisma.managementCompany.createMany({
    data: companiesToCreate,
  });
  console.log(`   - ${companiesToCreate.length} management companies created.`);

  const createdCompanies = await prisma.managementCompany.findMany();

  console.log("📄 Seeding SCPIs...");
  const scpisToCreate = Array.from({ length: 20 }).map(() => {
    const randomCompany = faker.helpers.arrayElement(createdCompanies);
    const partPrice = faker.number.float({
      min: 200,
      max: 1500,
      multipleOf: 1,
    });
    const subscriptionMinimum = faker.number.int({ min: 1, max: 10 });
    return {
      name: `SCPI ${faker.finance.accountName()}`,
      type: faker.helpers.arrayElement(["Rendement", "Fiscale", "Diversifiée"]),
      capitalization: faker.number.float({
        min: 100,
        max: 2000,
        multipleOf: 10,
      }),
      distributionRate: faker.number.float({
        min: 4,
        max: 7,
        multipleOf: 0.01,
      }),
      subscriptionMinimum: subscriptionMinimum,
      partPrice: partPrice,
      associateCount: faker.number.int({ min: 1000, max: 20000 }),
      partCount: faker.number.int({ min: 50000, max: 1000000 }),
      buildingCount: faker.number.int({ min: 10, max: 150 }),
      tenantCount: faker.number.int({ min: 50, max: 500 }),
      occupancyRate: faker.number.float({
        min: 85,
        max: 99.5,
        multipleOf: 0.1,
      }),
      managementCompanyId: randomCompany.id,
    };
  });

  await prisma.sCPI.createMany({
    data: scpisToCreate,
  });
  console.log(`   - ${scpisToCreate.length} SCPIs created.`);

  console.log("✅ Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ An error occurred during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
