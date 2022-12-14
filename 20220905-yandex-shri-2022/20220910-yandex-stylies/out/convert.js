function convertToCss(rules) {
    return rules.map(rule => [
        `${rule.selector} {`,
        ...Object.keys(rule.declarations).map(key => `\t${key}: ${rule.declarations[key]};`),
        '}'
    ]).flat().join('\n');
}
function convertToHtml(node) {
    if (node.type === 'ELEMENT') {
        const style = Object.keys(node.styles).map(key => `${key}: ${node.styles[key]};`).join(' ');
        return `<${node.tag} style="${style}">${node.children.map(e => convertToHtml(e)).join('\n')}</${node.tag}>`;
    }
    else {
        return node.text;
    }
}
export function convert(node, rules) {
    const html = convertToHtml(node);
    const css = convertToCss(rules);
    const style = `<style>\n${css}\n</style>`;
    return [html, style].join('\n');
}
//# sourceMappingURL=convert.js.map