import run from "aocrunner";

interface Item {
  index: number;
  value: number;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const items: Item[][] = []
  input.split("\n").forEach((line, lineIndex) => {
    line.split(/\s+/gi).forEach((value, columnIndex) => {
      if (items[columnIndex] === undefined) {
        items[columnIndex] = []
      }
      items[columnIndex].push({
        index: lineIndex,
        value: Number.parseInt(value),
      })
    })
  });
  
  items.forEach(itemList => {
    itemList.sort((a,b) => {
      if (a.value === b.value) {
        return a.index - b.index
      }
      return a.value - b.value
    })
  })
  
  let sum = 0;
  for (let i = 0; i < items[0].length; i++) {
    sum += Math.abs(items[0][i].value - items[1][i].value)
  }


  return sum
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const appearances: Record<number, number>[] = []
  input.split("\n").forEach((line, lineIndex) => {
    line.split(/\s+/gi).forEach((value, columnIndex) => {
      const parsedValue = Number.parseInt(value)
      if (appearances[columnIndex] === undefined) {
        appearances[columnIndex] = {}
      }

      if (appearances[columnIndex][parsedValue] === undefined) {
        appearances[columnIndex][parsedValue] = 0
      }
      
      appearances[columnIndex][parsedValue] = (appearances[columnIndex][parsedValue] || 0) + 1
    })
  })

  console.log(appearances)

  let score = 0;
  for (const value in appearances[0]) {
    const parsedValue = Number.parseInt(value)
    score += (parsedValue * (appearances[1][value] || 0)) * appearances[0][value]
  }

  return score;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
