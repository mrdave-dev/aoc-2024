import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function isDecreasing(a: number, b: number) {
  return a > b
}

function isIncreasing(a: number, b: number) {
  return a < b
}

function differsByOne(a: number, b: number) {
  return Math.abs(a - b) === 1
}

function doesNotDifferByMoreThanThree(a: number, b: number) {
  return Math.abs(a - b) <= 3
}

function isUnsafeCompare(increasing: boolean, a: number, b: number) {
  return (
    (increasing && !isIncreasing(a, b)) ||
    (!increasing && !isDecreasing(a, b)) ||
    (!differsByOne(a, b) &&
    !doesNotDifferByMoreThanThree(a, b))
  )
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeLines = 0;
  input.split('\n').forEach(line => {
    const values = line.split(/\s+/).map(Number)
    let safe = true
    let increasing = isIncreasing(values[0], values[1])
    for (let i = 0; i < values.length - 1; i++) {
      if (isUnsafeCompare(increasing, values[i], values[i + 1])) {
        safe = false
      }
    }
    if (safe) {
      safeLines += 1
    }
  })


  return safeLines;
};

function isSafeLine(values: number[]) {
  let safe = true
  let increasing = isIncreasing(values[0], values[1])
  for (let i = 0; i < values.length - 1; i++) {
    if (isUnsafeCompare(increasing, values[i], values[i + 1])) {
      safe = false
    }
  }
  return safe
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let safeLines = 0;
  
  input.split('\n').forEach((line, lineIndex) => {
    const values = line.split(/\s+/).map(Number)
    console.log(`Line ${lineIndex + 1}`, values)
    if (isSafeLine(values)) {
      console.log(`Initial line is safe`)
      safeLines += 1
    } else {
      for (let i = 0; i < values.length; i++) {
        console.log(`Removing value at index ${i}`)
        const newValues = values.concat()
        newValues.splice(i, 1)
        console.log(`New values: ${newValues}`)
        if (isSafeLine(newValues)) {
          console.log(`New values are safe`)
          safeLines += 1
          break
        }
      }
    }
  })

  return safeLines;
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
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
