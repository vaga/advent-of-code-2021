const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const numbers = lines[0].split(',').map(n => parseInt(n))

const GRID_SIZE = 5
const grids = []
for (let gridIndex = 0; gridIndex < (lines.length - 1) / GRID_SIZE; gridIndex++) {
  const grid = []
  for (let lineIndex = 0; lineIndex < GRID_SIZE; lineIndex++) {
    grid.push(
      lines[lineIndex + gridIndex * GRID_SIZE + 1]
        .split(/\s+/)
        .filter(n => n !== '')
        .map(n => parseInt(n))
    )
  }
  grids.push(grid)
}

play(grids, numbers)

function play(grids, numbers) {
    const winningGrids = []
    for (let number of numbers) {
      for (let grid of grids) {
        replaceNumber(grid, number)

        if (isWon(grid) && !winningGrids.includes(grid)) {
          winningGrids.push(grid)
          if ([1, grids.length].includes(winningGrids.length)) {
            // Print solutions!
            console.log(computeResult(grid, number))
          }
        }
      }
    }
}

function replaceNumber(grid, number) {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (grid[y][x] === number) {
                grid[y][x] = null
            }
        }
    }
}

function computeResult(grid, number) {
    let result = 0
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            result += grid[y][x]
        }
    }

    return result * number
}

function isWon(grid) {
  // Check lines
  for (let y = 0; y < GRID_SIZE; y++) {
    if (grid[y].filter(v => v === null).length === GRID_SIZE) {
        return true
    }
  }

  // Check columns
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid.map(line => line[x]).filter(v => v === null).length === GRID_SIZE) {
        return true
    }
  }

  return false
}
