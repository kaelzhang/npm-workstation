// Initialize workstation
// link dependencies

const path = require('path')
const {Command} = require('bin-tool')

const {workstation} = require('../../src/read-workstation')
const options = require('../options')
const {PackageCollection} = require('../../src/pkg')
const link = require('../../src/link')

module.exports = class StartCommand extends Command {
  get description () {
    return 'initialize and link projects'
  }

  constructor (raw) {
    super(raw)

    this.options = {
      workstation: options.workstation
    }
  }

  async run ({
    argv
  }) {
    const pc = new PackageCollection({
      projects: argv.workstation.projects
    })

    await pc.process()

    await link(pc)
  }
}
