const fs = require('fs')
const path = require('path')


function getIndexPath() {
    return path.join(process.cwd(), '.mygit', 'index')
}

function readIndex() {
    const indexPath = getIndexPath()

    if (!fs.existsSync(indexPath)) {
        return {version: 1, entries: {}}
    }

    try {
        const content = fs.readFileSync(indexPath, 'utf-8')
        return JSON.parse(content)
    } catch (error) {
        console.error('error: unable to read index')
        console.error(error.message)
        process.exit(1)
    }
}

function writeIndex(index) {
    const indexPath = getIndexPath()

    try {
        fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))
    } catch (error) {
        console.error('error: unable to write index');
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = {
    getIndexPath,
    readIndex,
    writeIndex
}
