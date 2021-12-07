const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')
let numbers = lines[0].split(',').map(n => parseInt(n))

console.log(solve(numbers, d => d))
console.log(solve(numbers, d => d*(d+1)/2))

function solve(numbers, calc) {
    const minValue = Math.min(...numbers)
    const maxValue = Math.max(...numbers)
    let result = Infinity
    for (let number = minValue; number <= maxValue; number++) {
        result = Math.min(
            result,
            numbers.reduce((acc, value) => acc + calc(Math.abs(number - value)), 0),
        )
    }
    return result
}
