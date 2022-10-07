const createCountdown = (num) => {
  let n = num > 0 ? num : 0;

  return () => {
    return n === 0 ? n : n--;
  }
}

const cd = createCountdown(2);

console.log( cd() )
console.log( cd() )
console.log( cd() )
console.log( cd() )
