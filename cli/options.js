const path = require('path')

const {workstation} = require('../src/read-workstation')

exports.workstation = {
  type: 'string',
  alias: 'w',
  description: 'specify the current used workstation',
  default () {
    const [ws] = this.rawParent._
    if (ws) {
      return ws
    }

    throw new Error('workstation must be specified')
  },

  set (name) {
    const ws = workstation.get(name)
    if (!ws) {
      throw new Error(`workstation "${name}" not found`)
    }

    return ws
  }
}

exports.optionalWorkstation = {
  type: 'string',
  alias: 'w',
  description: 'specify the current used workstation',
  default () {
    const [w] = this.rawParent._
    if (w) {
      return w
    }
  }
}

exports.cwd = {
  type: 'string',
  description: 'set the current working directory',
  default: process.cwd(),
  set: v => path.resolve(v)
}
