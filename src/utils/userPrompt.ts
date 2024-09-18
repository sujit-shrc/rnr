import readline from "readline";
import {
  ProjectConfig,
  ProjectType,
  PackageManager,
  Scripts,
} from "../types.js";

export async function promptForUpdate(
  config: ProjectConfig,
): Promise<ProjectConfig> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const updatedConfig: ProjectConfig = { ...config };

  for (const [key, value] of Object.entries(config)) {
    if (key === "scripts") {
      updatedConfig.scripts = await promptForScripts(rl, value as Scripts);
    } else if (key === "projectType") {
      updatedConfig.projectType = await promptForProjectType(
        rl,
        value as ProjectType,
      );
    } else if (key === "packageManager") {
      updatedConfig.packageManager = await promptForPackageManager(
        rl,
        value as PackageManager,
      );
    }
  }

  rl.close();
  return updatedConfig;
}

export function promptForConfirmation(
  question: string,
  defaultYes = true,
): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (${defaultYes ? "Y/n" : "y/N"}): `, (answer) => {
      rl.close();
      if (answer.trim() === "") {
        resolve(defaultYes);
      } else {
        resolve(answer.toLowerCase() === "y");
      }
    });
  });
}

async function promptForScripts(
  rl: readline.Interface,
  currentScripts: Scripts,
): Promise<Scripts> {
  const updatedScripts: Scripts = { ...currentScripts };
  for (const [scriptKey, scriptValue] of Object.entries(currentScripts)) {
    const answer = await new Promise<string>((resolve) => {
      rl.question(
        `Enter new value for scripts.${scriptKey} (current: ${scriptValue}, press enter to keep current): `,
        resolve,
      );
    });
    if (answer.trim() !== "") {
      updatedScripts[scriptKey] = answer.trim();
    }
  }
  return updatedScripts;
}

async function promptForProjectType(
  rl: readline.Interface,
  currentType: ProjectType,
): Promise<ProjectType> {
  const answer = await new Promise<string>((resolve) => {
    rl.question(
      `Enter new project type (current: ${currentType}, press enter to keep current): `,
      resolve,
    );
  });
  return answer.trim() !== "" ? (answer.trim() as ProjectType) : currentType;
}

async function promptForPackageManager(
  rl: readline.Interface,
  currentManager: PackageManager,
): Promise<PackageManager> {
  const answer = await new Promise<string>((resolve) => {
    rl.question(
      `Enter new package manager (current: ${currentManager}, press enter to keep current): `,
      resolve,
    );
  });
  return answer.trim() !== ""
    ? (answer.trim() as PackageManager)
    : currentManager;
}
