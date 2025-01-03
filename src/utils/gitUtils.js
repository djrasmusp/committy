import simpleGit from 'simple-git';
import {COMMIT_TYPES} from "./constants.js";
import {consola} from "consola";

const options = {
    baseDir: process.cwd(),
    binary: 'git',
}

const git = simpleGit(options);

export async function getBranchName() {
    try {
        const status = await git.status()
        consola.info('Current Branch : ' + status.current)
        return status.current;
    } catch (error) {
        consola.error(new Error('Could not get current branch'));
    }
}

export async function getDefaults() {
    const branch = await getBranchName();

    const match = branch.match(/^([a-zA-Z]+)\/(\d+)?-?(.+)?/);

    if (!match) {
        return {
            scope: '',
            id: ''
        }
    }

    const [branchname, scope, id, title] = match;

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

export async function appendFiles() {
    try {
        await git.add(['.'])
    } catch (error) {
        consola.error(error)
    }
}

export async function commitMessage(message) {
    try {
        const commit = await git.commit(message);
        consola.success('Successfully committed commit');

        return commit
    } catch (error) {
        consola.error(error)
    }
}

export async function appendToCommit() {
    try {
        await git.add('.')
        await git.raw(['commit', '--amend', '--no-edit']);

        consola.success('Successfully append files to latest commit');
    } catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('👋 until next time!');
            return
        }

        consola.error(error)
    }
}

export async function newBranch(name) {
    try {
        await git.checkoutLocalBranch(name);

        consola.success(`created new branch: ` + name);
    } catch (error) {
        logError(error);
    }
}

async function getDefaultBranch() {
    try {
        const branches = await git.branch();
        consola.start('Getting remote branches...');

        const remoteBranches = await git.listRemote(['--symref', 'origin', 'HEAD'])

        const lines = remoteBranches.split('\n');
        const headLine = lines.find(line => line.includes('ref: refs/heads/'))

        if (headLine) {

            const match = headLine.match(/refs\/heads\/(\S+)/);
            if (match) {
                const defaultBranch = match[1];
                consola.info('Default branch : ' + defaultBranch);
                return defaultBranch;
            }
        }
        consola.error('No default branches found.');
        process.exit(0)

    } catch (error) {
        consola.error(error);
    }
}

export async function goHome() {
    try {
        const defaultBranch = await getDefaultBranch();

        consola.info('Checkout to : ' + defaultBranch);

        await git.checkout(defaultBranch);
        consola.start('Fetching updates...');
        await git.pull()

        consola.success('Welcome home');

    } catch (error) {
        consola.error(error);
    }
}