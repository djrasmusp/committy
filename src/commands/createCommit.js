import {editor, input, select} from '@inquirer/prompts';
import {COMMIT_TYPES, ENVIROMENTS} from '../utils/constants.js'
import {select as multiselect} from 'inquirer-select-pro';
import {appendFiles, commitMessage, getDefaults, listOfFiles} from "../utils/gitUtils.js";
import {errorHandling} from "../utils/utils.js";

export async function createCommit(allFilesSelected) {
    try {
        const {scope, id} = await getDefaults()
        let selectedFiles = ['.']

        if (!allFilesSelected) {
            const files = await listOfFiles()

            selectedFiles = await multiselect({
                multiple: true,
                message: 'Select files',
                options: files,
                validate: (options) => options.length > 0
            })
        }

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

        await appendFiles(selectedFiles)

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
        errorHandling(error)
    }
}