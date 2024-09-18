import fs from "fs";
import { ProjectType, Scripts, PackageJson } from "../types.js";
import { logger } from "./logger.js";
import { promptForConfirmation } from "./userPrompt.js";

export async function detectScripts(
  projectType: ProjectType,
): Promise<Scripts> {
  try {
    const packageJson: PackageJson = JSON.parse(
      fs.readFileSync("package.json", "utf-8"),
    );
    const detectedScripts = packageJson.scripts || {};

    const scripts: Scripts = {
      dev: detectedScripts.dev || detectedScripts.start,
      prod:
        detectedScripts.prod ||
        detectedScripts.start ||
        detectedScripts.production ||
        detectedScripts.deploy ||
        detectedScripts.serve ||
        detectedScripts.preview ||
        detectedScripts.dev,
      test: detectedScripts.test,
      build: detectedScripts.build,
    };

    // Remove any undefined scripts
    Object.keys(scripts).forEach((key) => {
      if (scripts[key] === undefined) {
        delete scripts[key];
      }
    });

    // If dev or prod scripts are not found, suggest default scripts based on project type
    if (!scripts.dev || !scripts.prod) {
      const defaultScripts = getDefaultScripts(projectType);
      const useDefault = await promptForConfirmation(
        `No ${!scripts.dev ? "dev" : "prod"} script found. Use default (${defaultScripts.dev || defaultScripts.prod})?`,
      );

      if (useDefault) {
        scripts.dev = scripts.dev || defaultScripts.dev;
        scripts.prod = scripts.prod || defaultScripts.prod;
      }
    }

    return scripts;
  } catch (error) {
    logger.error("Error detecting scripts:", error);
    // return {};
    throw error;
  }
}

function getDefaultScripts(projectType: ProjectType): Scripts {
  switch (projectType) {
    case "nextjs":
      return { dev: "next dev", prod: "next start", build: "next build" };
    case "expressjs":
      return { dev: "nodemon index.js", prod: "node index.js" };
    case "vitereact":
      return { dev: "vite", prod: "vite preview", build: "vite build" };
    case "nuxtjs":
      return { dev: "nuxt dev", prod: "nuxt start", build: "nuxt build" };
    case "react":
      return {
        dev: "react-scripts start",
        prod: "serve -s build",
        build: "react-scripts build",
      };
    case "vue":
      return {
        dev: "vue-cli-service serve",
        prod: "vue-cli-service serve",
        build: "vue-cli-service build",
      };
    default:
      return { dev: "npm start", prod: "npm start" };
  }
}
