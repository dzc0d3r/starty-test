import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app"; // resolves to apps/server/src/app.ts

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
