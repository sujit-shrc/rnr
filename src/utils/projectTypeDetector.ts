import fs from "fs";
import path from "path";
import { logger } from "./logger.js";
import { ProjectType, PackageJson } from "../types.js";

interface ProjectTypeDetector {
  type: ProjectType;
  detect: (packageJson: PackageJson, rootDir: string) => boolean;
}

const projectTypeDetectors: ProjectTypeDetector[] = [
  {
    type: "nextjs",
    detect: (packageJson) => hasPackage(packageJson, "next"),
  },
  {
    type: "expressjs",
    detect: (packageJson) => hasPackage(packageJson, "express"),
  },
  {
    type: "vitereact",
    detect: (packageJson) =>
      hasPackage(packageJson, "vite") && hasPackage(packageJson, "react"),
  },
  {
    type: "nuxtjs",
    detect: (packageJson) => hasPackage(packageJson, "nuxt"),
  },
  {
    type: "turborepo",
    detect: (_, rootDir) => fs.existsSync(path.join(rootDir, "turbo.json")),
  },
  {
    type: "monorepo",
    detect: (_, rootDir) => fs.existsSync(path.join(rootDir, "lerna.json")),
  },
  {
    type: "react",
    detect: (packageJson) =>
      hasPackage(packageJson, "react") && !hasPackage(packageJson, "vite"),
  },
  {
    type: "vue",
    detect: (packageJson) => hasPackage(packageJson, "vue"),
  },
  {
    type: "angular",
    detect: (packageJson) => hasPackage(packageJson, "@angular/core"),
  },
  {
    type: "svelte",
    detect: (packageJson) => hasPackage(packageJson, "svelte"),
  },
  {
    type: "gatsby",
    detect: (packageJson) => hasPackage(packageJson, "gatsby"),
  },
  {
    type: "nestjs",
    detect: (packageJson) => hasPackage(packageJson, "@nestjs/core"),
  },
  {
    type: "electron",
    detect: (packageJson) => hasPackage(packageJson, "electron"),
  },
  {
    type: "remix",
    detect: (packageJson) => hasPackage(packageJson, "@remix-run/react"),
  },
  {
    type: "preact",
    detect: (packageJson) => hasPackage(packageJson, "preact"),
  },
];

function hasPackage(packageJson: PackageJson, packageName: string): boolean {
  return !!(
    packageJson.dependencies?.[packageName] ||
    packageJson.devDependencies?.[packageName]
  );
}

export async function detectProjectType(): Promise<ProjectType> {
  try {
    const rootDir = process.cwd();
    const packageJsonPath = path.join(rootDir, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      logger.warn(
        "No package.json found in the current directory, please make sure you are in the root dir of your project.",
      );
      return "unknown";
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    for (const detector of projectTypeDetectors) {
      if (detector.detect(packageJson, rootDir)) {
        return detector.type;
      }
    }

    return "unknown";
  } catch (error) {
    logger.error("Error detecting project type:", error);
    return "unknown";
  }
}
