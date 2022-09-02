import treeGen from './treeGen.js';

const tree = treeGen(10);

const average = graph => {
  const values = inner(graph);
  const avg = values.reduce((avg, value, index, array) => avg + value / array.length, 0);
  return avg;

  function inner(graph) {
    if (graph.children.length === 0) {
      return graph.values;
    } 
    else {
      const currentNodeValues = graph.values;

      const childNodesValues = graph.children
        .map(child => inner(child))
        .filter(value => value !== undefined)
        .reduce((accum, child) => [...accum, ...child], [])

      const totalValues = [...currentNodeValues, ...childNodesValues]


      return totalValues;
    }
  }
}

const minmax = graph => {
  // 1. Простейший случай (нет дочерних узлов и значений)
  if (graph.children.length === 0 && graph.values.length === 0) {
    return undefined;
  } 
  // 2. Простейший случай (нет дочерних узлов, но есть значения)
  else if (graph.children.length === 0 && graph.values.length > 0) {
    return {
      min: Math.min(...graph.values),
      max: Math.max(...graph.values)
    }
  }
  // 2. Сложный случай
  else {
    // 2.1. Минимум и максимум значений дочерних узлов
    const childMinMax = graph.children
      .map(child => minmax(child))
      .filter(child => child !== undefined)
      .reduce((accum, child) => {
        accum.min = Math.min(accum.min, child.min) || child.min;
        accum.max = Math.max(accum.max, child.max) || child.max;
        return accum;
      }, {})
          
    
    // 2.2. Минимум и максимум значений текущего узла
    const currentMinMax = {
      min: Math.min(...graph.values),
      max: Math.max(...graph.values)
    }
    
    // 2.3. Минимум и максимум дочерних и текущих значений
    const totalMinMax = {
      min: Math.min(currentMinMax.min, childMinMax.min) || currentMinMax.min,
      max: Math.max(currentMinMax.max, childMinMax.max) || currentMinMax.max,
    }
    
    return totalMinMax;
  }
}

console.group('Task 01');

console.log('tree:', tree);
console.log('average:', average(tree));
console.log('minmax:', minmax(tree));