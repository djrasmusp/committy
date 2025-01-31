export function kebabCase(str, keepLeadingDash = true) {
    return ((keepLeadingDash) ? '-' : '') + str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();
}

export function errorHandling(error) {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('👋 until next time!');
        return
    }

    if (error?.constructor?.name === 'ExitPromptError') {
        console.log('👋 until next time!');
        return
    }

    console.error(error);
}