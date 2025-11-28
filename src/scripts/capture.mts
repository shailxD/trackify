import fs from "node:fs";
import path from "node:path";

import type { Browser } from "puppeteer-core";
import puppeteer from "puppeteer-core";

const executablePath =
  "C:\\Users\\shail\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe";

const BASE_URL = process.env.URL || "http://localhost:4173";
const outputDir = path.join(process.cwd(), "public/screenshots");

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/dashboard", name: "dashboard" },
  { path: "/expenses", name: "expenses" },
];

const SIZE = {
  // Full HD
  desktop: {
    width: 1920,
    height: 1080,
  },
  // iPhone 16 Pro Max
  mobile: {
    width: 440,
    height: 956,
  },
} as const;

async function captureScreenshot({
  browser,
  url,
  size,
  name,
  type = "webp",
}: {
  browser: Browser;
  url: string;
  size: keyof typeof SIZE;
  name: string;
  type?: "webp" | "png" | "jpeg";
}) {
  // Ensure the output directory exists
  await fs.promises.mkdir(outputDir, { recursive: true });

  const page = await browser.newPage();

  const { width, height } = SIZE[size];
  await page.setViewport({ width, height });

  await page.goto(url, { waitUntil: "networkidle2" });

  const filePath = path.join(
    outputDir,
    `screenshot-${name}-${size}.${type}`
  ) as `${string}.webp` | `${string}.png` | `${string}.jpeg`;

  await page.screenshot({
    path: filePath,
    type,
    quality: type !== "png" ? 90 : undefined,
  });

  console.log(`✅ Screenshot saved:`, filePath);

  await page.close();
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath,
  });

  try {
    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;

      await captureScreenshot({
        browser,
        url,
        size: "desktop",
        name: route.name,
      });

      await captureScreenshot({
        browser,
        url,
        size: "mobile",
        name: route.name,
      });
    }

    console.log("✅ All screenshots captured successfully.");
  } catch (error) {
    console.error("⛔️ Error capturing screenshots:", error);
  } finally {
    await browser.close();
  }
}

main();
