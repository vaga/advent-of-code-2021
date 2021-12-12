const fs = require('fs')

const lines = fs.readFileSync('./data.txt', 'utf-8').split(/\n/).filter(l => l !== '')

const nodes = {}
for (let line of lines) {
    let [current, next] = line.split('-')
    if (!nodes[current]) {
        nodes[current] = { name: current, size: current === current.toUpperCase() ? Infinity : 1, next: [] } 
    }
    if (!nodes[next]) {
        nodes[next] = { name: next, size: next === next.toUpperCase() ? Infinity : 1, next: [] } 
    }

    nodes[current].next.push(nodes[next])
    nodes[next].next.push(nodes[current])
}

console.log(countPaths(nodes['start'], false))
console.log(countPaths(nodes['start'], true))

function countPaths(node, revisit, debug = []) {
    debug = [...debug, node.name]
    if (node.name === 'end') {
        //console.log(debug.join(','))
        return 1
    }

    if ((node.size === 0 && node.name === 'start') || (node.size <= 0 && !revisit)) {
        return 0
    }

    node.size -= 1

    let count = 0
    for (let n of node.next) {
        count += countPaths(n, !(node.size < 0 || !revisit), debug)
    }
    node.size += 1

    return count
}
