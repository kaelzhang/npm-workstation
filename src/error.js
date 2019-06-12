const {Errors} = require('err-object')

const {E, error} = new Errors({
  messagePrefix: '[npm-workstation] ',
  filterStackSources: [
    __filename
  ]
})

E('PKG_NOT_FOUND', 'package.json is not found in "%s"')
E('READ_PKG_FAILED', 'fails to read "%s"')
E('ERROR_BIN', 'bin.%s is not found or errored, details: %s')

module.exports = {
  error
}
