import {input, select} from '@inquirer/prompts';
import {COMMIT_TYPES} from '../utils/constants.js'
import {newBranch} from "../utils/gitUtils.js";
import {kebabCase} from "../utils/utils.js";
import {consola} from "consola";

export async function createBranch() {
    try {
        const answers = {
            scope: await select({
                message: 'Select branch scope',
                choices: COMMIT_TYPES.sort().map(item => {
                    return {
                        name: item,
                        value: item
                    }
                })
            }),
            id: await input({
                message: 'Task id',
            }),
            title: await input({
                    message: 'Branch title',
                    required: true,
                }
            )
        }

        const title = kebabCase(answers.title, !(answers.id.length == 0))
        const name = `${answers.scope}/${answers.id}${title}`

        await newBranch(name)
    } catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('👋 until next time!');
            return
        }

        consola.error(error);
    }
}