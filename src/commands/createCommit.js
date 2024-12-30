import {select, input, number, confirm} from '@inquirer/prompts';
import {COMMIT_TYPES, ENVIROMENTS} from '../utils/constants.js'
import {getDefaults, commitMessage, appendFiles, pushCommit} from "../utils/gitUtils.js";
import {logError} from "../utils/logger.js";

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
            id: await number({
                message: 'Task id',
                required: true,
                default: id,
            }),
            title: await input({
                    message: 'Commit title',
                    required: true,
                }
            ),
            message: await input({
                message: 'Commit message',
            }),
            environment: await select({
                message: 'Environment',
                default: 'test',
                choices: ENVIROMENTS.sort().map(item => {
                    return {
                        name: item,
                        value: item
                    }
                })
            }),
            push: await confirm({
                message: 'Want it pushed',
                default: false
            })
        }

        let message  = `${answers.scope}(${answers.id}): ${answers.title}`

        if(answers.message){
            message = message + `
            
${answers.message}
           `
        }

        message = message + `
        
Environment: ${answers.environment}`

        const commit = await commitMessage(message)

        if(answers.push){
            await pushCommit(commit)
        }

    } catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('👋 until next time!');
            return
        }

        logError(error)
    }
}