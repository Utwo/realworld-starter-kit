'use strict'

const Model = use('Model')

class Tag extends Model {
  static get dates () {
    return []
  }

  static get createdAtColumn () {
    return ''
  }

  static get updatedAtColumn () {
    return ''
  }

  articles () {
    return this.hasMany('App/Models/Article')
  }
}

module.exports = Tag
