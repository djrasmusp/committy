#!/usr/bin/env node
import {program} from "commander";
import {createCommit} from "./commands/createCommit.js";
import {appendToCommit, goHome} from "./utils/gitUtils.js";
import {createBranch} from "./commands/createBranch.js";
import {restoreFiles} from "./commands/restoreFiles.js";

program
    .command("commit", {
        isDefault: true
    })
    .option('--all', 'Add All changes to commit', false)
    .action(async (str) => {
        await createCommit(str.all)
    })

program.command("append")
    .description('Append files to lastest commit')
    .option('--all', 'Restore all changes', false)
    .action(async (str) => {
        await appendToCommit(str.all)
    })

program.command("branch")
    .description('Create new branch')
    .action(async () => {
        await createBranch()
    })

program.command("gohome").description('Go to default branch and pull lastest changes').action(async () => {
    await goHome()
})

program.command("restore")
    .description('Restore files')
    .option('--all', 'Restore all changes', false).action(async (str) => {
    await restoreFiles(str.all)
})

program.command("test").description('TEST agfa').option('--all', 'Add All changes to commit', false).action((str, options) => {

    if (options.all) {
        return console.log('Add all')
    }

    return console.log('Selected changes')
})


program.parse(process.argv);