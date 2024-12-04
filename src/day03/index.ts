import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const regex = /mul\((\d+),(\d+)\)/gi
  const matches = input.match(regex) || []
  console.log(`Matches:`, matches)
  let sum = 0
  for (const match of matches) {
    const numString = match.slice(4, -1)
    console.log(`Number string:`, numString)
    const numSplit = numString.split(',')
    console.log(`Num split:`, numSplit)
    const num1 = parseInt(numSplit[0])
    const num2 = parseInt(numSplit[1])
    const product = num1 * num2
    console.log(`${num1} * ${num2} = ${product}`)
    sum += product
    console.log(`Sum:`, sum)
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/gi

  const matches = input.match(regex) || []
  console.log(`Matches:`, matches)
  let sum = 0
  let instruction: string | null = 'do()'
  for (const match of matches) {
    if (match === 'don\'t()') {
      instruction = null
    } else if (match === 'do()') {
      instruction = 'do()'
    } else if (instruction === 'do()') {
      const numString = match.slice(4, -1)
      console.log(`Number string:`, numString)
      const numSplit = numString.split(',')
      console.log(`Num split:`, numSplit)
      const num1 = parseInt(numSplit[0])
      const num2 = parseInt(numSplit[1])
      const product = num1 * num2
      console.log(`${num1} * ${num2} = ${product}`)
      sum += product
      console.log(`Sum:`, sum)
    }
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
