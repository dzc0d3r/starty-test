import supertest from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app";

const request = supertest(app);

describe("GET /api/v1/companies", () => {
  it("should return a 200 OK status code", async () => {
    const response = await request.get("/api/v1/companies");

    expect(response.status).toBe(200);
  });

  it("should return a list of companies in the response body", async () => {
    const response = await request.get("/api/v1/companies");

    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return company objects with the correct shape", async () => {
    const response = await request.get("/api/v1/companies");

    const firstCompany = response.body[0];

    expect(firstCompany).toHaveProperty("id");
    expect(firstCompany).toHaveProperty("name");
    expect(firstCompany).toHaveProperty("description");
    expect(firstCompany).toHaveProperty("scpis"); // Crucially, check for the nested array

    expect(Array.isArray(firstCompany.scpis)).toBe(true);
  });
});
