import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function checkUpdate(update: number[], rulesMap: Map<number, number[]>) {
  if (update.length === 1) {
    console.log('Update is length 1, returning true')
    return true
  }

  for (let i = 0; i < update.length; i++) {
    const rules = rulesMap.get(update[i])
    for (let j = i; j >= 0; j--) {
      if (rules && rules.includes(update[j])) {
        console.log(`Found ${update[j]} in ${update} with rule ${update[i]}|${rules}`)
        return false
      }
    }
  }
  return true
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sections = input.split("\n\n");
  const rulesParsed = sections[0].split('\n').map(line => line.split('|'))
  const rulesMap = new Map<number, number[]>()
  rulesParsed.forEach(([key, value]) => {
    rulesMap.set(
      parseInt(key), 
      (rulesMap.get(parseInt(key)) || []).concat(Number.parseInt(value))
    )
  })
  console.log({rulesMap})

  const updates = sections[1].split('\n').map(line => line.split(',').map(Number))
  console.log({updates})

  const passed = updates.filter(update => checkUpdate(update, rulesMap))
  console.log({passed})
  const passedMiddleSum = passed.map(p => p[Math.floor(p.length / 2)]).reduce((a, b) => a + b, 0)

  return passedMiddleSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sections = input.split("\n\n");
  const rulesParsed = sections[0].split('\n').map(line => line.split('|'))
  const rulesMap = new Map<number, number[]>()
  rulesParsed.forEach(([key, value]) => {
    rulesMap.set(
      parseInt(key), 
      (rulesMap.get(parseInt(key)) || []).concat(Number.parseInt(value))
    )
  })
  console.log({rulesMap})

  const updates = sections[1].split('\n').map(line => line.split(',').map(Number))
  console.log({updates})

  const failed = updates.filter(update => !checkUpdate(update, rulesMap))

  function sortUpdate(a: number, b: number) {
    const aRules = rulesMap.get(a)
    if (!aRules) { return 0 }
    if (aRules.includes(b)) { return -1 }
    return 0
  }

  const failedCorrected = failed.map(update => update.sort(sortUpdate))
  console.log({failed})
  const failedMiddleSum = failed.map(p => p[Math.floor(p.length / 2)]).reduce((a, b) => a + b, 0)

  return failedMiddleSum;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
