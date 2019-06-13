// Read and parse all packages

const readPkg = require('./read-pkg')

class Package {
  constructor (name) {
    this.name = name
    this.dependents = Object.create(null)
    this.pkg = null
    this.lastCommitHead = null
    this.path = null
  }

  addDependent (pkg) {
    this.dependents[pkg.name] = pkg
  }
}

// Parser all packages and calculate dependents
class PackageCollection {
  constructor ({
    projects
  }) {
    this._projects = projects
    this._packages = Object.create(null)
  }

  async process () {
    const tasks = this._projects.map(project => this._processOne(project))
    await Promise.all(tasks)

    for (const [name, pkg] of Object.entries(this._packages)) {
      if (!pkg.pkg) {
        // Delete packages that is not included by the current workstation
        delete this._packages[name]
      }
    }
  }

  get packages () {
    return this._packages
  }

  async _processOne ({
    path: projectPath,
    commitHead
  }) {
    const rawPkg = await readPkg(projectPath)
    const pkg = this._getPackage(rawPkg.name)

    pkg.pkg = rawPkg
    pkg.lastCommitHead = commitHead
    pkg.path = projectPath

    const {
      dependencies,
      devDependencies,
      peerDependencies
    } = rawPkg

    this._addDependents(pkg, dependencies)
    this._addDependents(pkg, devDependencies)
    this._addDependents(pkg, peerDependencies)
  }

  _getPackage (name) {
    return this._packages[name] || (
      this._packages[name] = new Package(name)
    )
  }

  _addDependents (dependentpkg, dependencies) {
    if (!dependencies) {
      return
    }

    for (const dependencyName of Object.keys(dependencies)) {
      this._addDependent(dependentpkg, dependencyName)
    }
  }

  _addDependent (dependentpkg, dependencyName) {
    const dependency = this._getPackage(dependencyName)
    dependency.addDependent(dependentpkg)
  }
}

module.exports = {
  PackageCollection
}
