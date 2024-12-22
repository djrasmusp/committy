import {COMMIT_TYPES, ENVIROMENTS} from '../utils/constants.js'
import {getDefaults, commitMessage, appendFiles} from "../utils/gitUtils.js";
import {consola} from "consola";

export async function createCommit() {
    try {
        const {scope, id} = await getDefaults()

        appendFiles()

        const scopeType = await consola.prompt("Select commit scope", {
            type: "select",
            options: COMMIT_TYPES.sort().map(item => {
                return {
                    label: item,
                    value: item
                }
            }),
            initial: scope
        })

        console.log(scopeType)

        const answers = {

            id: await consola.prompt("Task id", {
                initial: id,
            }),
            title: await consola.prompt("Commit title", {
            }),
            message: await consola.prompt("Commit message", {
            }),
            environment: await consola.prompt("Select enviroment", {
                type: "select",
                options: ENVIROMENTS.sort().map(item => {
                    return {
                        label: item,
                        value: item
                    }
                }),
                initial: scope
            }),
        }

        let message  = `${answers.scope}(${answers.id}): ${answers.title}`

        if(answers.message){
            message = message + `
            
${answers.message}
           `
        }

        message = message + `
        
Environment: ${answers.environment}`

        await commitMessage(message)

    } catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('👋 until next time!');
            return
        }

        consola.error(error);
    }
}