import treeGen from './treeGen.js';

const tree = treeGen(10);

const min = graph => {
    // TODO
};

const max = graph => {
    // TODO
};

const distance = graph => {
    // TODO
}

console.group('Task 02');

console.log('tree:', tree);
console.log('min:', min(tree));
console.log('max:', max(tree));
console.log('distance between min and max:', distance(tree));

console.groupEnd();