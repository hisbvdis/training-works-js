const treeGen = depth => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const recursion = depth => ({
        values: new Array(rnd(0, 3))
            .fill(0)
            .map(_ => Math.random() * 100),
        children: new Array(depth === 1 ? 0 : rnd(0, 3))
            .fill(0)
            .map(_ => recursion(depth - 1))
    });

    return recursion(depth);
};

export default treeGen;