import { detectProjectType } from "../utils/projectTypeDetector.js";
import { detectPackageManager } from "../utils/packageManagerDetector.js";
import { detectScripts } from "../utils/scriptDetector.js";
import { runProject } from "../utils/projectRunner.js";
import { saveConfig, loadConfig } from "../utils/configManager.js";
import { promptForConfirmation, promptForUpdate } from "../utils/userPrompt.js";
import { logger } from "../utils/logger.js";
import { ProjectConfig, RunMode } from "../types.js";
import chalk from "chalk";

export async function run(mode: RunMode): Promise<void> {
  const runMode = validateMode(mode);
  const config = await getOrCreateConfig();
  await runProject(config, runMode);
}

function validateMode(mode: string): RunMode {
  const validModes = ["dev", "prod", "test", "build"];
  if (!validModes.includes(mode)) {
    logger.warn(`Invalid mode: ${mode}. Using default mode: dev`);
    return "dev";
  }
  return mode as RunMode;
}

async function getOrCreateConfig(): Promise<ProjectConfig> {
  let config = loadConfig();
  const currentPackageManager = await detectPackageManager();

  if (config) {
    if (config.packageManager !== currentPackageManager) {
      logger.warn(
        `Package manager changed from ${config.packageManager} to ${currentPackageManager}.`,
      );
      const useExisting = await promptForConfirmation(
        "Do you want to update the configuration?",
      );

      if (useExisting) {
        config.packageManager = currentPackageManager;
        const scripts = await detectScripts(config.projectType);
        config.scripts = scripts;
        saveConfig(config);
      }
    }
  } else {
    config = await createNewConfig();
  }

  return config;
}

async function createNewConfig(): Promise<ProjectConfig> {
  const projectType = await detectProjectType();
  const packageManager = await detectPackageManager();
  const scripts = await detectScripts(projectType);

  const config: ProjectConfig = {
    projectType,
    packageManager,
    scripts,
  };

  logger.info("Detected configuration:");
  console.log(config);

  const msg = chalk.cyan("Are these configurations correct?");
  const confirmed = await promptForConfirmation(msg.toString());

  if (!confirmed) {
    const updatedConfig = await promptForUpdate(config);
    saveConfig(updatedConfig);
    return updatedConfig;
  }

  saveConfig(config);
  return config;
}
