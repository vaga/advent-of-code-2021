const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const entries = []
for (let line of lines) {
    const parts = line.split(' | ')

    entries.push({
        digits: parts[0].split(' '),
        output: parts[1].split(' '),
    })
}

console.log(entries.reduce((acc, entry) => acc + entry.output.filter(v => [2, 4, 3, 7].includes(v.length)).length, 0))

const filters = [
    {
        number: 1,
        find: (v) => v.length === 2,
    },
    {
        number: 4,
        find: (v) => v.length === 4,
    },
    {
        number: 7,
        find: (v) => v.length === 3,
    },
    {
        number: 8,
        find: (v) => v.length === 7,
    },
    {
        number: 3,
        find: (v, patterns) => diff(v, patterns[1]) === 3,
    },
    {
        number: 9,
        find: (v, patterns) => diff(patterns[4], v) === 0,
    },
    {
        number: 5,
        find: (v, patterns) => diff(v, patterns[9]) === 0,
    },
    {
        number: 6,
        find: (v, patterns) => diff(v, patterns[5]) === 1,
    },
    {
        number: 2,
        find: (v) => v.length === 5,
    },
    {
        number: 0,
        find: (v) => v.length === 6,
    },
]

let result = 0
for (let entry of entries) {
    const digits = [...entry.digits]
    const patterns = Array(10).fill(null)

    for (let filter of filters) {
        const digit = digits.find(v => filter.find(v, patterns))
        digits.splice(digits.indexOf(digit), 1)
        patterns[filter.number] = digit
    }

    result += computeOutput(entry.output, patterns)
}
console.log(result)

function computeOutput(output, patterns) {
    return patterns.indexOf(patterns.find(v => equals(output[0], v))) * 1000 +
        patterns.indexOf(patterns.find(v => equals(output[1], v))) * 100 +
        patterns.indexOf(patterns.find(v => equals(output[2], v))) * 10 +
        patterns.indexOf(patterns.find(v => equals(output[3], v)))
}

function diff(str1, str2) {
    let result = 0
    for (let char1 of str1) {
        if (!str2.includes(char1)) {
            result++
        }
    }
    return result
}

function equals(str1, str2) {
    if (str1.length !== str2.length) {
        return false
    }

    return diff(str1, str2) === 0
}
