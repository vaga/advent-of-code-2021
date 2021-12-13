const fs = require('fs')

const blocks = fs.readFileSync('./data.txt', 'utf-8').split(/\n\n/)

let currentCoords = blocks[0].split(/\n/).filter(l => l !== '')
    .map(l => {
        const coord = l.split(',')
        return [parseInt(coord[1]), parseInt(coord[0])]
    })

const folds = blocks[1].split(/\n/).filter(l => l !== '')
    .map(l => {
        const [orientation, nb] = l.split(' ')[2].split('=')
        return { orientation, coordinate: parseInt(nb) }
    })

console.log(foldPaper(currentCoords, folds[0]).length)

for (let fold of folds) {
    currentCoords = foldPaper(currentCoords, fold)
}

printPaper(currentCoords)

function foldPaper(currentCoords, fold) {
    if (fold.orientation === 'x') {
        currentCoords = currentCoords.map(c => [c[1], c[0]])
    }

    const maxY = Math.max(...currentCoords.map(coord => coord[0]))
    const partUp = fold.coordinate - 1
    const partDown = maxY - fold.coordinate - 1

    let nextCoords = []
    for (let [y, x] of currentCoords) {
        if (y < fold.coordinate) {
            push(nextCoords, (partUp < partDown) ? [y + (partDown - partUp), x] : [y, x])
        }

        if (y > fold.coordinate) {
            push(nextCoords, (partDown < partUp) ? [maxY - y + (partUp - partDown), x] : [maxY - y, x])
        }
    }

    if (fold.orientation === 'x') {
        nextCoords = nextCoords.map(c => [c[1], c[0]])
    }

    return nextCoords
}

function equals(c1, c2) {
    return c1[0] === c2[0] && c1[1] === c2[1]
}

function push(arr, c1) {
    if (!arr.some(c2 => equals(c1, c2))) {
        arr.push(c1)
    }
}

function printPaper(coords) {
    const maxY = Math.max(...coords.map(coord => coord[0]))
    const maxX = Math.max(...coords.map(coord => coord[1]))
    for (let y = 0; y <= maxY; y++) {
        let line = ''
        for (let x = 0; x <= maxX; x++) {
            if (coords.some(c => c[0] === y && c[1] === x)) {
                line += '#'
            } else {
                line += '.'
            }
        }
        console.log(line)
    }
}
