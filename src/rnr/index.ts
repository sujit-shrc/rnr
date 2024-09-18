import { Command } from "commander";
import chalk from "chalk";
import { run } from "../commands/run.js";
import { logger } from "../utils/logger.js";
import { RunMode } from "../types.js";

const program = new Command();
const version = "1.0.0";
program
  .name("rnr")
  .description("Launcher for your JavaScript/TypeScript projects with ease")
  .version("1.0.0");

program
  .argument("[mode]", "run mode (dev, prod, test, or build)", "dev")
  .option("-m, --mode <mode>", "run mode (dev, prod, test, or build)")
  .action(async (modeArg, options) => {
    const mode = (options.mode || modeArg) as RunMode;
    try {
      await run(mode);
    } catch (error) {
      logger.error("An error occurred:", error);
      process.exit(1);
    }
  });

export default function init() {
  console.log(chalk.green("󱓞 rnr v" + version));
  program.parse(process.argv);
}
