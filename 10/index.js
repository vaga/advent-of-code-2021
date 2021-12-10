const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const brackets = {
    '{': '}',
    '<': '>',
    '[': ']',
    '(': ')',
}

const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}

let result = 0
const scores = []
for (let line of lines) {
    let openedBrackets = []
    for (let bracket of line) {
        if (['}', '>', ']', ')'].includes(bracket)) {
            const open = openedBrackets.pop(bracket)
            if (brackets[open] === bracket) {
                continue
            }

            result += points[bracket]
            openedBrackets = []
            break
        }

        openedBrackets.push(bracket)
    }

    const score = openedBrackets.reverse().reduce((acc, bracket) => acc * 5 + points[bracket], 0)
    if (score > 0) {
        scores.push(score)
    }

}

console.log(result)
const sortedScores = scores.sort((a, b) => a - b)
console.log(sortedScores[Math.floor(sortedScores.length / 2)])
