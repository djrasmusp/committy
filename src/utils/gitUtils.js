import simpleGit from 'simple-git';
import chalk from "chalk";
import {logError, logInfo, logSuccess} from "./logger.js";

const options = {
    baseDir: process.cwd(),
    binary: 'git',
}

const git = simpleGit(options);

export async function getBranchName(){
    try{
        const status = await git.status()
        logInfo(chalk.bold('  Current Branch : ') + chalk(status.current))
        return status.current;
    }catch(error){
        logError('Could not get current branch');
    }
}

export async function getDefaults(){
    const branch = await getBranchName();

    const match = branch.match(/^([a-zA-Z]+)\/(\d+)?-?(.+)?/);
    if(!match) {
        return {
            scope: '',
            id: ''
        }
    }

    const [scope, id] = match;

    if (COMMIT_TYPES.includes(type)) {
        return {
            scope,
            id: id || ''
        }
    }

    return {
        scope: '',
        id: ''
    }
}

export async function appendFiles(){
    try{
        await git.add(['.'])
    }catch (error) {
        logError(error);
    }
}

export async function commitMessage(message){
    try{
        await git.commit(message);
        logSuccess()
    }catch (error){
        logError(error);
    }
}