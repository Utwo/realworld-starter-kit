'use strict'

const Model = use('Model')

class BaseModel extends Model {
  static get createdAtColumn () {
    return 'createdAt'
  }

  static get updatedAtColumn () {
    return 'updatedAt'
  }

  static formatDates (field, value) {
    return value
  }

  static castDates (field, value) {
    return value
  }
}

module.exports = BaseModel
