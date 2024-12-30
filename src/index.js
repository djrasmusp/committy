#!/usr/bin/env node
import {program} from "commander";
import {createCommit} from "./commands/createCommit.js";
import {appendToCommit} from "./utils/gitUtils.js";
import {createBranch} from "./commands/createBranch.js";

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

program.parse(process.argv);