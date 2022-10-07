import data from "./input.js";

const tag = (node) => {
  const name = {
    Button: "button",
    Image: "div"
  }

  const type = {
    FRAME: "div",
    INSTANCE: "div",
    TEXT: "span",
    RECTANGLE: "div",
  }
  
  return name[node.name] || type[node.type];
}

const STYLES = {
  paddingTop: (value) => `padding-top: ${value}px;`,
  paddingRight: (value) => `padding-right: ${value}px;`,
  paddingBottom: (value) => `padding-bottom: ${value}px;`,
  paddingLeft: (value) => `padding-left: ${value}px;`,
  fontWeight: (value) => `font-weight: ${value};`,
  fontSize: (value) => `font-size: ${value}px;`,
  lineHeightPx: (value) => `line-height: ${value}px;`,
  cornerRadius: (value) => `border-radius: ${value}px;`,
  layoutMode: (value) => {
    if (value === "HORIZONTAL") {
      return `display: flex; flex-direction: row;`;
    } else if (value === "VERTICAL") {
      return `display: flex; flex-direction: column;`;
    }
  },
  itemSpacing: (value) => `gap: ${value}px;`,
  background: (value) => {
    const r = Math.trunc(value[0].color.r * 255);
    const g = Math.trunc(value[0].color.g * 255);
    const b = Math.trunc(value[0].color.b * 255);
    const a = value[0].color.a;
    if (value[0].visible !== false) {
      return `background: rgb(${r} ${g} ${b} / ${a});`;
    }
    return "";
  },
};

const styles = (node) => {
  const styleArr = [];
  if (node.style) {
    for (let [key, value] of Object.entries(node.style)) {
      if (STYLES[key]) {
        styleArr.push(STYLES[key](value));
      }
    }
  }

  for (let [key, value] of Object.entries(node)) {
    if (STYLES[key]) {
      styleArr.push(STYLES[key](value));
    } 
  }

  if (node.name === "Image") {
    styleArr.push(`inline-size: ${node.absoluteRenderBounds.width}px;`);
    styleArr.push(`block-size: ${node.absoluteRenderBounds.height}px;`);

    const r = Math.trunc(node.fills[0].color.r * 255);
    const g = Math.trunc(node.fills[0].color.g * 255);
    const b = Math.trunc(node.fills[0].color.b * 255);
    const a = node.fills[0].color.a;
    if (node.fills[0].visible !== false) {
      styleArr.push(`background: rgb(${r} ${g} ${b} / ${a});`);
    }
  }

  if (node.name === "Button") {
    styleArr.push(`cursor: pointer;`);
  }

  return styleArr.join(' ');
}

const createElem = (node, content="") => {
  const inner = content || node.characters || "";

  return `<${tag(node)} style="${styles(node)}">${inner || content}</${tag(
    node
  )}>`;
}

const parse = (node) => {
  if (!node.children) {
    return createElem(node)
  } else {
    return createElem(node, node.children.reduce((accum, item) => accum.concat(parse(item)), ``))
  }
};

const entry = data.document.children[0].children[0];
document.body.innerHTML = parse(entry);