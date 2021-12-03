const fs = require('fs')

const commands = fs.readFileSync('./data.txt', 'utf-8')
  .split(/\n/)
  .filter(v => v.length > 0)
  .map(line => {
    const [ dir, units ]  = line.split(' ')
    return { dir, units: parseInt(units) }
  })

function solve1(commands) {
  let depth = 0
  let hpos = 0

  for (const command of commands) {
    switch (command.dir) {
      case 'forward':
        hpos += command.units
      break
      case 'down':
        depth += command.units
      break
      case 'up':
        depth -= command.units
      break
      default:
        throw new error(`command not found: ${command.dir}`)
    }
  }

  return depth * hpos
}

function solve2(commands) {
  let depth = 0
  let hpos = 0
  let aim = 0

  for (const command of commands) {
    switch (command.dir) {
      case 'forward':
        hpos += command.units
        depth += aim * command.units
      break
      case 'down':
        aim += command.units
      break
      case 'up':
        aim -= command.units
      break
      default:
        throw new error(`command not found: ${command.dir}`)
    }
  }

  return depth * hpos
}

console.log(solve1(commands))
console.log(solve2(commands))
