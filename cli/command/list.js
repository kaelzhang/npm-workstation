// List all related repos

// npmw ls
// npmw ls <workstation>

const path = require('path')
const Command = require('common-bin')
const chalk = require('chalk')

const {workstation} = require('../../src/read-workstation')

module.exports = class StartCommand extends Command {
  constructor (raw) {
    super(raw)

    this.options = {

    }
  }

  async run ({
    argv
  }) {
    const names = await workstation.allNames()
    const current = workstation.currentName()

    for (const name of names) {
      if (name === current) {
        console.log(`* ${chalk.green(name)}`)
      } else {
        console.log(`  ${name}`)
      }
    }
  }
}
