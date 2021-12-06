const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')
let numbers = lines[0].split(',').map(n => parseInt(n))

let initialState = Array(9).fill(0)
for (let number of numbers) {
    initialState[number]++
}

console.log(solve(initialState, 80))
console.log(solve(initialState, 256))

function solve(initialState, nbDays) {
    let current = [...initialState]
    for (let i = 0; i < nbDays; i++) {
        let next = Array(initialState.length).fill(0)

        // Create new fish
        next[8] = current[0]
        next[6] = current[0]

        // Decrease
        for (let day = 1; day < current.length; day++) {
            next[day-1] += current[day]
        }

        current = next
    }

    return current.reduce((acc, a) => acc + a, 0)
}
