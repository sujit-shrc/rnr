import chalk from "chalk";

export const logger = {
  info: (message: string) => console.log(chalk.blue(message)),
  error: (message: string, error?: Error | unknown) =>
    console.error(
      chalk.red(message),
      error instanceof Error ? error.message : error || "",
    ),
  success: (message: string) => console.log(chalk.green(message)),
  warn: (message: string) => console.log(chalk.yellow(message)),
};
