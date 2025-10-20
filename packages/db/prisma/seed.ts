import { faker } from "@faker-js/faker";
import argon2 from "argon2";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting the seeding process...");

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
  const plainTextPassword = "demo1234";

  for (const userData of adminUsersData) {
    const hashedPassword = await argon2.hash(plainTextPassword);
    await prisma.user.create({
      data: {
        ...userData,
        hashedPassword: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(), // Mark as verified for simplicity
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
  }));

  await prisma.managementCompany.createMany({
    data: companiesToCreate,
  });
  console.log(`   - ${companiesToCreate.length} management companies created.`);

  const createdCompanies = await prisma.managementCompany.findMany();

  console.log("📄 Seeding SCPIs...");
  const scpisToCreate = Array.from({ length: 20 }).map(() => {
    const randomCompany = faker.helpers.arrayElement(createdCompanies);
    return {
      name: `SCPI ${faker.finance.accountName()}`,
      type: faker.helpers.arrayElement(["Rendement", "Fiscale", "Plus-value"]),
      capitalization: faker.number.float({
        min: 100_000_000,
        max: 2_000_000_000,
        multipleOf: 1_000_000,
      }),
      distributionRate: faker.number.float({
        min: 4,
        max: 7,
        multipleOf: 0.01,
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
