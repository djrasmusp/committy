import {gitRestoreFiles, listOfFiles} from "../utils/gitUtils.js";
import {select as multiselect} from 'inquirer-select-pro';
import {errorHandling} from "../utils/utils.js";


export async function restoreFiles(allFilesSelected) {
    try {

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
        

        await gitRestoreFiles(selectedFiles)
    } catch (error) {
        errorHandling(error)
    }
}