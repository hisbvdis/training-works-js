// Не забудьте перед отправкой изменить в module.exports = function(html, css) {
export default (html, css) => {
    html.styles.color = "rgb(0, 255, 0)";
    html.children[1].styles.color = "rgb(255, 0, 0)";
    html.styles["font-size"] = "15px";
    html.children[1].styles["font-size"] = "15px";
    const styles = css.reduce((accum, { selector, declarations }) => (Object.assign(Object.assign({}, accum), { [selector]: declarations })), {});
    const matchCssToHtml = (node, parentTag = []) => {
        if (node.type === "ELEMENT" && parentTag.length > 0) {
            parentTag.forEach((parent) => Object.keys(styles[parent]).forEach((prop) => (node.styles[prop] = styles[parent][prop])));
        }
        if (node.type === "ELEMENT") {
            Object.keys(styles[node.tag]).forEach((prop) => (node.styles[prop] = styles[node.tag][prop]));
        }
        if (node.hasOwnProperty("children")) {
            node.children.forEach((child) => matchCssToHtml(child, parentTag.concat(node.tag)));
        }
        return node;
    };
    return matchCssToHtml(html);
};
//# sourceMappingURL=main.js.map