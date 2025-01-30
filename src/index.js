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
    .action(async () => {
        await createCommit()
    })

program.command("append")
    .action(async () => {
        await appendToCommit()
    })

program.command("branch")
    .action(async () => {
        await createBranch()
    })

program.command("gohome").action(async () => {
    await goHome()
})

program.command("restore").action(async () => {
    await restoreFiles()
})

program.parse(process.argv);