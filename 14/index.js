const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l != '')

const template = lines.shift()

const defs = {}
for (let line of lines) {
    const [pair, letter] = line.split(' -> ')
    defs[pair] = letter
}

const counter = new Array(26).fill(0)
let currentPairs = {}
for (let i = 0; i < template.length; i++) {
    counter[template[i].charCodeAt(0) - 65] += 1

    if (i + 1 < template.length) {
        add(currentPairs, `${template[i]}${template[i+1]}`, 1)
    }
}

for (let step = 1; step <= 40; step++) {
    let newPairs = {}
    for (let pair in currentPairs) {
        const letter = defs[pair]
        counter[letter.charCodeAt(0) - 65] += currentPairs[pair]

        add(newPairs, `${pair[0]}${letter}`, currentPairs[pair])
        add(newPairs, `${letter}${pair[1]}`, currentPairs[pair])
    }
    currentPairs = newPairs

    if (step === 10) {
        console.log(computeResult(counter))
    }
}

console.log(computeResult(counter))

function add(pairs, pair, value) {
    if (pairs[pair]) {
        pairs[pair] += value
    } else {
        pairs[pair] = value
    }
}

function computeResult(counter) {
    const max = Math.max(...counter)
    const min = Math.min(...counter.filter(v => v !== 0))

    return max - min
}
