export function kebabCase(str, keepLeadingDash = true) {
    return ((keepLeadingDash) ? '-' : '') + str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();
}