class CustomFormatter {
  constructor () {
    this.errors = { errors: {} }
  }

  addError (error, field) {
    console.log(error)

    if (this.errors.errors[field]) {
      return this.errors.errors[field].push(error)
    }

    this.errors.errors[field] = [error]

    return this.errors.errors[field]
  }

  toJSON () {
    return Object.keys(this.errors.errors).length !== 0 ? this.errors : null
  }
}

module.exports = CustomFormatter
