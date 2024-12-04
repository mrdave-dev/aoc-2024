import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function checkNorth (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (y - i < 0) {
      return false
    }
    if (grid[Math.max(y - i, 0)][x] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkNorthEast (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (y - i < 0 || x + i >= grid[y].length) {
      return false
    }
    if (grid[Math.max(y - i, 0)][Math.min(x + i, grid[y].length - 1)] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkEast (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (x + i >= grid[y].length) {
      return false
    }
    if (grid[y][Math.min(x + i, grid[y].length - 1)] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkSouthEast (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (y + i >= grid.length || x + i >= grid[y].length) {
      return false
    }
    if (grid[Math.min(y + i, grid.length - 1)][Math.min(x + i, grid[y].length - 1)] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkSouth (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (y + i >= grid.length) {
      return false
    }
    if (grid[Math.min(y + i, grid.length - 1)][x] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkSouthWest (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (y + i >= grid.length || x - i < 0) {
      return false
    }
    if (grid[Math.min(y + i, grid.length - 1)][Math.max(x - i, 0)] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkWest (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (x - i < 0) {
      return false
    }
    if (grid[y][Math.max(x - i, 0)] !== targetWord[i]) {
      return false
    }
  }
  return true
}

function checkNorthWest (targetWord: string, grid: string[][], x: number, y: number) {
  for (let i = 0; i < targetWord.length; i++) {
    if (y - i < 0 || x - i < 0) {
      return false
    }
    if (grid[Math.max(y - i, 0)][Math.max(x - i, 0)] !== targetWord[i]) {
      return false
    }
  }
  return true
}

const part1 = (rawInput: string) => {
  const targetWord = 'XMAS'
  let count = 0
  const input = parseInput(rawInput);
  const lines = input.split('\n')
  const grid = lines.map(line => line.split(''))
  console.log('Grid:', grid)
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === targetWord[0]) {
        if (checkNorth(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going north`)
          count++
        }
        if (checkNorthEast(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going north-east`)
          count++
        }
        if (checkEast(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going east`)
          count++
        } 
        if (checkSouthEast(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going south-east`)
          count++
        }
        if (checkSouth(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going south`)
          count++
        } 
        if (checkSouthWest(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going south-west`)
          count++
        }
        if (checkWest(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going west`)
          count++
        }
        if (checkNorthWest(targetWord, grid, x, y)) {
          console.log(`Found ${targetWord[0]} at [${x}, ${y}] going north-west`)
          count++
        } 
      }
    }
  }
  
  return count;
};

function checkForMatchEast(targetWord: string, grid: string[][], x: number, y: number) {
  if (x + targetWord.length >= grid[y].length) {
    return false
  }
  console.log(`Checking for match at [${x + targetWord.length - 1}, ${y}] (east)`)
  return checkSouthWest(targetWord, grid, x + targetWord.length - 1, y) || 
    checkSouthWest(targetWord.split('').reverse().join(''), grid, x + targetWord.length - 1, y)
}

function checkForMatchWest(targetWord: string, grid: string[][], x: number, y: number) {
  if (x - targetWord.length < 0) {
    return false
  }
  console.log(`Checking for match at [${x}, ${y}] (west)`)
  return checkSouthEast(targetWord, grid, x - targetWord.length + 1, y) ||
    checkSouthEast(targetWord.split('').reverse().join(''), grid, x - targetWord.length + 1, y)
}

const part2 = (rawInput: string) => {
  // We dont want to double count, so we store the top left coordinate of each X we have found
  const topLeftFoundSet = new Set<string>()
  const targetWord = 'MAS'
  const reverseTargetWord = targetWord.split('').reverse().join('')
  let count = 0
  const input = parseInput(rawInput);
  const lines = input.split('\n')
  const grid = lines.map(line => line.split(''))
  console.log('Grid:', grid)

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (checkSouthEast(targetWord, grid, x, y)) {
        console.log(`Word found at [${x}, ${y}] going south-east`)
        if (checkForMatchEast(targetWord, grid, x, y)) {
          console.log(`Found match at [${x}, ${y}] (east)`)
          if (!topLeftFoundSet.has(`${x},${y}`)) {
            count++
            topLeftFoundSet.add(`${x},${y}`)
          }
        }
      }
      if (checkSouthWest(targetWord, grid, x, y)) {
        console.log(`Word found at [${x}, ${y}] going south-west`)
        if (checkForMatchWest(targetWord, grid, x, y)) {
          console.log(`Found match at [${x}, ${y}] (west)`)
          if (!topLeftFoundSet.has(`${x-targetWord.length+1},${y}`)) {
            count++
            topLeftFoundSet.add(`${x-targetWord.length+1},${y}`)
          }
        }
      }

      if (checkSouthEast(reverseTargetWord, grid, x, y)) {
        console.log(`Reverse word found at [${x}, ${y}] going south-east`)
        if (checkForMatchEast(reverseTargetWord, grid, x, y)) {
          console.log(`Found match at [${x}, ${y}] (east)`)
          if (!topLeftFoundSet.has(`${x},${y}`)) {
            count++
            topLeftFoundSet.add(`${x},${y}`)
          }
        }
      }

      if (checkSouthWest(reverseTargetWord, grid, x, y)) {
        console.log(`Reverse word found at [${x}, ${y}] going south-west`)
        if (checkForMatchWest(reverseTargetWord, grid, x, y)) {
          console.log(`Found match at [${x}, ${y}] (west)`)
          if (!topLeftFoundSet.has(`${x-targetWord.length+1},${y}`)) {
            count++
            topLeftFoundSet.add(`${x-targetWord.length+1},${y}`)
          }
        }
      }
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
