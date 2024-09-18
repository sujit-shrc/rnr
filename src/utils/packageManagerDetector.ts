import { execSync } from "child_process";
import { PackageManager } from "../types.js";

export async function detectPackageManager(): Promise<PackageManager> {
  const managers: PackageManager[] = ["bun", "pnpm", "yarn", "npm"];

  for (const manager of managers) {
    try {
      execSync(`${manager} --version`, { stdio: "ignore" });
      return manager;
    } catch (error) {
      // Manager not found, continue to next
    }
  }

  return "npm"; // Default to npm if nothing else is found
}
