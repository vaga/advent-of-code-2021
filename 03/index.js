const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const counters = []
for (let i = 0; i < lines[0].length; i++) {
  let counter = {one: [], zero: []}
  for (let line of lines) {
    (line[i] === '1' ? counter.one : counter.zero).push(line)
  }
  counters.push(counter)
}

const epsilon = counters.reduce(
  (epsilon, {one, zero}, i) => epsilon + (one.length > zero.length ? Math.pow(2, counters.length - i - 1) : 0),
  0,
)

const gamma  = counters.reduce(
  (gamma, {one, zero}, i) => gamma + (one.length < zero.length ? Math.pow(2, counters.length - i - 1) : 0),
  0,
)

console.log(gamma * epsilon)

let arr = lines
for (let counter of counters) {
    const one = counter.one.filter(v => arr.includes(v))
    const zero = counter.zero.filter(v => arr.includes(v))
    arr = (one.length >= zero.length) ? one : zero

    if (arr.length === 1) {
        break
    }
}
const oxygen = parseInt(arr[0], 2)

arr = lines
for (let counter of counters) {
    const one = counter.one.filter(v => arr.includes(v))
    const zero = counter.zero.filter(v => arr.includes(v))
    arr = (one.length < zero.length) ? one : zero

    if (arr.length === 1) {
        break
    }
}
const co2 = parseInt(arr[0], 2)

console.log(oxygen * co2)
