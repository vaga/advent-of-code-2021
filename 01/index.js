const fs = require('fs')

const data = fs.readFileSync('./data.txt', 'utf-8')
    .split(/\n/)
    .map(v => parseInt(v))
console.log(solve(data))

const data2 = data.map((v, index) => v + data[index + 1] + data[index + 2])
console.log(solve(data2))

function solve(data) {
  let result = 0
  for (let i = 1; i < data.length; i++) {
    if (data[i-1] < data[i]) {
      result++
    }
  }
  return result
}
