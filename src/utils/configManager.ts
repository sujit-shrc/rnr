import fs from "fs";
import path from "path";
import { ProjectConfig } from "../types.js";
import { logger } from "./logger.js";

const CONFIG_FILE = path.join(process.cwd(), ".rnr.rc");

export function saveConfig(config: ProjectConfig): void {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (error) {
    logger.error("Error saving configuration:", error);
    throw error;
  }
}

export function loadConfig(): ProjectConfig | null {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    return validateConfig(config) ? config : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      logger.error("Error loading configuration:", error);
    }
    return null;
  }
}

function validateConfig(config: ProjectConfig): config is ProjectConfig {
  return (
    typeof config === "object" &&
    typeof config.projectType === "string" &&
    typeof config.packageManager === "string" &&
    typeof config.scripts === "object"
  );
}

export function updateConfig(updates: Partial<ProjectConfig>): void {
  const config = loadConfig() || ({} as ProjectConfig);
  const updatedConfig = { ...config, ...updates };
  saveConfig(updatedConfig);
}
