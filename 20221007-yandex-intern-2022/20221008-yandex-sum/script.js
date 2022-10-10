const sumExcept = (arr, from, count) => {
  const isInt = (n) => {
    if (typeof n !== "number") return false;
    if (n % 1 !== 0) return false;
    return true;
  }

  const isPos = (n) => {
    return n >= 0;
  }

  const fromTested = isInt(from) && isPos(from) ? from : 0;
  let countTested = isInt(count) && isPos(count) ? count : 0;
  
  return arr.reduce((accum, value, i) => {
    const valueTested = isInt(value) ? value : 0;
    
    if (i >= fromTested && i < fromTested + countTested) {
      return accum;
    }

    return accum + valueTested
  }, 0)
}

// 5
console.log( sumExcept([1, 9, 8, 4], 1, 2));
