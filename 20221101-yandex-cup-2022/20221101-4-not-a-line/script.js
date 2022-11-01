const func = (numbers) => {
  const alphabet = {
    0: "0",
    1: "1",
    2: "2",
    5: "5",
    10: "A",
    12: "C",
    14: "E",
    22: "M",
    28: "S",
    38: "c",
    44: "i",
    51: "p",
    53: "r",
    55: "t",
    62: " ",
  };

  return numbers.map((num) => alphabet[num] || "_").join("")
}

console.log( func([14,12,22,10,28,38,53,44,51,55,62,2,0,1,5]) )
