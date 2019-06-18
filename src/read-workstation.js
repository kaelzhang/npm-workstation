const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')
const home = require('home')

const error = require('./error')
const {exists} = require('./utils')

// const HOME = home()
const NPM_WORKSTATION = '.npm-workstation'
const EMPTY_WORKSTATION = {
  projects: []
}

class Workstation {
  constructor (root) {
    this._root = root
  }

  exists (name) {
    const workstationFile = this._getWSFile(name)

    if (exists(workstationFile)) {
      return workstationFile
    }
  }

  get (name) {
    const file = this.exists(name)

    if (!file) {
      return
    }

    const workstation = fs.readJsonSync(file)
    return workstation
  }

  _getWSFile (name) {
    return path.join(
      this._root, NPM_WORKSTATION, name + NPM_WORKSTATION)
  }

  _getCurrentNameFile () {
    return path.join(this._root, NPM_WORKSTATION, 'CURRENT')
  }

  currentName () {
    const currentFile = this._getCurrentNameFile()

    try {
      const content = fs.readFileSync(currentFile)
      return content.toString().trim()
    } catch (err) {
      if (err.code === 'ENOENT') {
        return
      }

      throw error('READ_CURRENT_FAILED', err.stack)
    }
  }

  async setCurrentName (name) {
    const currentFile = this._getCurrentNameFile()

    await fs.outputFile(currentFile, name)
  }

  async create (name) {
    return fs.outputFile(this._getWSFile(name),
      JSON.stringify(EMPTY_WORKSTATION, null, 2))
  }

  async allNames () {
    const cwd = path.join(this._root, NPM_WORKSTATION)
    if (!exists(cwd)) {
      return []
    }

    const files = await globby(['*.npm-workstation'], {
      cwd
    })

    return files.map(f => path.basename(f, NPM_WORKSTATION))
  }
}

module.exports = {
  Workstation,
  workstation: new Workstation(home())
}
