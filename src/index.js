#!/usr/bin/env node


import {createCommit} from "./commands/createCommit.js";

import {program} from "commander";

program
    .version("1.0.0")
    .description("My Node CLI")
    .command("commit", {
        isDefault: true
    })
    .action(async () => {
        await createCommit()
    })

program.parse(process.argv);