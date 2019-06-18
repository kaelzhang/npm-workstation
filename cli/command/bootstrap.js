// Initialize workstation
// link dependencies

const path = require('path')
const {Command} = require('bin-tool')

const {workstation} = require('../../src/read-workstation')
const {PackageCollection} = require('../../src/pkg')
const link = require('../../src/link')

module.exports = class StartCommand extends Command {
  get description () {
    return 'initialize and link projects'
  }

  constructor (raw) {
    super(raw)

    this.options = {
      workstation: {
        type: 'string',
        alias: 'w',
        description: 'specify the current used workstation',
        default () {
          const [w] = this.rawParent._
          if (w) {
            return w
          }

          throw new Error('workstation must be specified')
        }
      }
    }
  }

  async run ({
    argv
  }) {
    const ws = workstation.get(argv.workstation)
    if (!ws) {
      throw new Error(`workstation "${argv.workstation}" not found`)
    }

    const pc = new PackageCollection({
      projects: ws.projects
    })

    await link(pc)
  }
}
