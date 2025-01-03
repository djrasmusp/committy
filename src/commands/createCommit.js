import {editor, input, select} from '@inquirer/prompts';
import {COMMIT_TYPES, ENVIROMENTS} from '../utils/constants.js'
import {appendFiles, commitMessage, getDefaults} from "../utils/gitUtils.js";
import {consola} from "consola";

export async function createCommit() {
    try {
        const {scope, id} = await getDefaults()

        appendFiles()

        const answers = {
            scope: await select({
                message: 'Select commit scope',
                default: scope,
                choices: COMMIT_TYPES.sort().map(item => {
                    return {
                        name: item,
                        value: item
                    }
                })
            }),
            id: await input({
                message: 'Task id',
                default: id,
            }),
            title: await input({
                    message: 'Commit title',
                    required: true,
                }
            ),
            message: await editor({
                message: 'Commit message',
                waitForUseInput: false
            }),
            environment: await select({
                message: 'Environment',
                default: undefined,
                choices: [
                    {
                        name: 'none',
                        value: undefined
                    },
                    ...ENVIROMENTS.map(item => {
                        return {
                            name: item,
                            value: item
                        }
                    })],
            })
        }

        let message = `${answers.scope}(${answers.id}): ${answers.title}`

        if (answers.message) {
            message = message + `
            
${answers.message}
           `
        }
        if (answers.environment) {
            message = message + `
        
ENV: ${answers.environment}`
        }

        await commitMessage(message)

    } catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('👋 until next time!');
            return
        }

        consola.error(error);
    }
}