// Initialize workstation
// link dependencies

const path = require('path')
const {Command} = require('bin-tool')

module.exports = class StartCommand extends Command {
  constructor (raw) {
    super(raw)

    this.options = {
      workstation: {
        type: 'string',
        description: 'specify the current used workstation',
        default: async () => 1,
        // coerce: v => path.resolve(v)
      }
    }
  }

  async run ({
    argv
  }) {
    console.log(argv)
  }
}
