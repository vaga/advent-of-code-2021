const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const map = lines.map(l => l.split('').map(n => parseInt(n)))

let step = 1
let result = 0
let next = true
while (next) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === 9) {
                result += explode(map, y, x)
            } else {
                map[y][x] += 1
            }
        }
    }

    let bigboom = true
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] > 9) {
                map[y][x] = 0
            } else {
                bigboom = false
            }
        }
    }

    if (bigboom) {
        console.log(step)
        next = false
    }

    if (step === 100) {
        console.log(result)
    }
    step++
}

function explode(map, y, x) {
    if (y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
        return 0
    }

    map[y][x] += 1

    if (map[y][x] !== 10) {
        return 0
    }

    let size = 1
    const coords = getAdjacentsCoordinates(y, x)
    for (let [ay, ax] of coords) {
        size += explode(map, ay, ax)
    }

    return size
}

function getAdjacentsCoordinates(y, x) {
    const coords = []
    for (let j = y-1; j <= y+1; j++) {
        for (let i = x-1; i <= x+1; i++) {
            if (j === y && i === x) {
                continue
            }

            coords.push([j,i])
        }
    }
    return coords
}
