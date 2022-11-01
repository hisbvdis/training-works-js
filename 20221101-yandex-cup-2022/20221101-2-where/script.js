const originalString = "lg=lv_ll_lg=vl";
const rulesMap = {
  "l": 1,
  "v": 3,
  "_": "\n",
  "=": " = ",
}
const tokensMap = {
  "lg": "val"
}


const lint = (str, tokens, rules) => {
  const newStringSymbolIndex = Object.values(rules).indexOf("\n");
  const newStringSymbol = Object.keys(rules)[newStringSymbolIndex];
  const strings = str.split(newStringSymbol);
  const arrays = strings.map((value) => value.split("="));
  
  return arrays
    .map(([key, value]) => {
      if (value === undefined) {
        return key;
      }

      return [tokens[key], value];
    })
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }
      const [key, value] = item;

      const newValue = value
        .split("")
        .map((sym) => {
          let newSym = sym;
          while (Object.keys(rules).includes(newSym)) {
            newSym = rules[newSym];
          }
          return newSym;
        })
        .join("");
      return [`let ${key}`, newValue].join("=");
    })
    .join("\n");
}

console.log( lint(originalString, tokensMap, rulesMap) )
