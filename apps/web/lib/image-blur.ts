"use server";

import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataURL(
  imageUrl: string,
): Promise<string | undefined> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (err) {
    console.error("Error generating blur placeholder:", err);
  }
}
