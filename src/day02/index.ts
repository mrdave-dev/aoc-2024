import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function isDecreasing(a: number, b: number) {
  return a > b
}

function differsByOne(a: number, b: number) {
  return Math.abs(a - b) === 1
}

function doesNotDifferByMoreThanThree(a: number, b: number) {
  return Math.abs(a - b) <= 3
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeLines = 0;
  input.split('\n').forEach(line => {
    const values = line.split(/\s+/).map(Number)
    let safe = true
    for (let i = 0; i < values.length - 1; i++) {
      console.log(values[i], values[i + 1])
      console.log(isDecreasing(values[i], values[i + 1]), differsByOne(values[i], values[i + 1]), doesNotDifferByMoreThanThree(values[i], values[i + 1]))
      if (
        !isDecreasing(values[i], values[i + 1]) ||
        (!differsByOne(values[i], values[i + 1]) &&
        !doesNotDifferByMoreThanThree(values[i], values[i + 1]))
      ) {
        console.log('not safe')
        safe = false
      }
    }
    if (safe) {
      safeLines += 1
    }
  })


  return safeLines;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
