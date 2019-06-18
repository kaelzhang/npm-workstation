// Publish the workstation

// 1. Publish
// npmw publish -- [npm-publish-options]

const path = require('path')
const {Command} = require('bin-tool')

module.exports = class StartCommand extends Command {
  constructor (raw) {
    super(raw)

    this.options = {
      cwd: {
        type: 'string',
        description: 'set the current working directory',
        default: process.cwd(),
        coerce: v => path.resolve(v)
      }
    }
  }

  async run ({
    argv
  }) {

  }
}
