const path = require('path')
const fs = require('fs-extra')
// const home = require('home')

const error = require('./error')

// const HOME = home()
const SUB_DIR = '.npm-workstation'

const getCurrentName = root => {
  const currentFile = path.join(root, SUB_DIR, 'CURRENT')

  try {
    return fs.readFileSync(currentFile)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return
    }

    throw error('READ_CURRENT_FAILED', err.stack)
  }
}

const isExists = (root, name) => {
  const workstationFile = path.join(root, SUB_DIR, `${name}.npm-workstation`)
}

const getWorkStation = name => {

}
