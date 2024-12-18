import chalk from "chalk";

export function logSuccess(message = '') {
    console.log(chalk.bgRgb(0,153,0).rgb(204,255,204).bold('  SUCCESS  ') + chalk.rgb(0,153,0)('  ' +message));
}

export function logInfo(message= ''){
    console.log((message));
}

export function logWarning(message= '') {
    console.log(chalk.bgRgb	(255,255,255).rgb(254, 138, 24).bold('  WARN  ') + chalk.rgb(254, 138, 24)('  ' +message));
}

export function logError(message= '') {
    console.log(chalk.bgRgb(255,204,204).rgb(204,0,0).bold('  ERROR  ') + chalk.rgb(204,0,0).bold('  ' +message));
}
