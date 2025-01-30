import {consola} from "consola";
import {listOfFiles} from "../utils/gitUtils.js";
import {select} from 'inquirer-select-pro';


export async function restoreFiles() {
    try {
        const files = await listOfFiles()

        const answers = {
            selectedFiles: await select({
                multiple: true,
                message: 'Select files',
                options: files
            })
        }

        console.log(answers.selectedFiles);
    } catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('👋 until next time!');
            return
        }

        consola.error(error);
    }
}