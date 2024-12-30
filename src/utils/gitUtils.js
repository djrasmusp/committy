import simpleGit from 'simple-git';
import chalk from "chalk";
import {logError, logInfo, logSuccess} from "./logger.js";
import {COMMIT_TYPES} from "./constants.js";

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

    const [ branchname, scope, id, title] = match;

    console.log(scope, id)

    if (COMMIT_TYPES.includes(scope)) {
        return {
            branchname,
            scope,
            id: id || '',
            title: title || ''
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

export async function commitMessage(message) {
    try{
        const commit  = await git.commit(message);
        logSuccess()

        return commit
    }catch (error){
        logError(error);
    }
}

export async function pushCommit(commit){
    try{
        await git.push()
        logInfo(`Pushed (${commit.commit}) to origin`)
    }catch (error){
        logError(error);
    }
}