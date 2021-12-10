const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const map = lines.map(l => l.split('').map(n => parseInt(n)))

let result = 0
let basinSizes = []
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (isLower(map, {y, x})) {
            result += map[y][x] + 1
            const basin = getBasinSize(map, {y, x}, null, [])
            basinSizes.push(basin.length)
        }
    }
}

console.log(result)
basinSizes = basinSizes.sort((a, b) => a - b)
console.log(
    basinSizes[basinSizes.length - 3] *
    basinSizes[basinSizes.length - 2] *
    basinSizes[basinSizes.length - 1]
)

function getBasinSize(map, p, t, found) {
    if (p.y < 0 || p.y >= map.length || p.x < 0 || p.x >= map[0].length) {
        return []
    }

    if (
        (t !== null && map[p.y][p.x] < map[t.y][t.x]) ||
        map[p.y][p.x] === 9 ||
        found.some(v => v.y === p.y && v.x === p.x)
    ) {
        return []
    }

    found.push(p)

    return 1 +
        getBasinSize(map, { y: p.y-1, x: p.x }, p, found) +
        getBasinSize(map, { y: p.y+1, x: p.x }, p, found) +
        getBasinSize(map, { y: p.y, x: p.x+1 }, p, found) +
        getBasinSize(map, { y: p.y, x: p.x-1 }, p, found)
}

function isLower(map, p) {
    const adjacents = []
    if (p.y - 1 >= 0) {
        adjacents.push(map[p.y - 1][p.x])
    }

    if (p.y + 1 < map.length) {
        adjacents.push(map[p.y + 1][p.x])
    }

    if (p.x - 1 >= 0) {
        adjacents.push(map[p.y][p.x - 1])
    }
    if (p.x + 1 < map[0].length) {
        adjacents.push(map[p.y][p.x + 1])
    }

    return !adjacents.some(v => map[p.y][p.x] >= v)
}
