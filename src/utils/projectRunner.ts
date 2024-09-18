import { spawn } from "child_process";
import { logger } from "./logger.js";
import { ProjectConfig, RunMode } from "../types.js";
import fs from "fs";
import path from "path";

export async function runProject(
  config: ProjectConfig,
  mode: RunMode,
): Promise<void> {
  const { packageManager, scripts, projectType } = config;
  const defaultScript = scripts[mode] || scripts.dev || "start";

  if (mode === "prod" && !hasBuildOutput()) {
    logger.warn(
      "Build not found. Running build script before starting production server.",
    );
    await runScript(packageManager, scripts.build || "build");
  }

  if (["turborepo", "monorepo"].includes(projectType)) {
    await runMonorepoProject(packageManager, defaultScript);
  } else {
    await runScript(packageManager, defaultScript);
  }
}

function hasBuildOutput(): boolean {
  const buildDirs = ["build", "dist", ".next", "out"];
  return buildDirs.some((dir) => fs.existsSync(dir));
}

async function runMonorepoProject(
  packageManager: string,
  script: string,
): Promise<void> {
  const workspaces = getWorkspaces();

  for (const workspace of workspaces) {
    const packages = fs.readdirSync(workspace);
    for (const pkg of packages) {
      const packagePath = path.join(workspace, pkg);
      if (fs.statSync(packagePath).isDirectory()) {
        logger.info(`Running ${script} script for ${pkg}`);
        await runScript(packageManager, script, packagePath);
      }
    }
  }
}

function getWorkspaces(): string[] {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  return packageJson.workspaces || [];
}

async function runScript(
  packageManager: string,
  script: string,
  cwd: string = process.cwd(),
): Promise<void> {
  const command = `${packageManager} run ${script}`;
  logger.info(` ${command}`);

  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, { shell: true, stdio: "inherit", cwd });

    childProcess.on("close", (code) => {
      code === 0
        ? resolve()
        : reject(new Error(`Process exited with code ${code}`));
    });

    childProcess.on("error", reject);
  });
}
