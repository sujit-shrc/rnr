export type RunMode = "dev" | "prod" | "test" | "build";

export type ProjectType =
  | "nextjs"
  | "expressjs"
  | "vitereact"
  | "nuxtjs"
  | "turborepo"
  | "monorepo"
  | "react"
  | "vue"
  | "angular"
  | "svelte"
  | "gatsby"
  | "nestjs"
  | "electron"
  | "remix"
  | "preact"
  | "unknown";

export type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

export interface Scripts {
  [key: string]: string;
}

export interface ProjectConfig {
  projectType: ProjectType;
  packageManager: PackageManager;
  scripts: Scripts;
}

export interface PackageJson {
  scripts?: Scripts;
  dependencies?: Record<string, string>;
  devDependencies: Record<string, string>;
  workspaces?: string[];
}
