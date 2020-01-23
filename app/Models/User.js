'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeSave', 'User.hashPassword')
  }

  static get hidden () {
    return ['email', 'password', 'followers']
  }

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

  comments () {
    return this.hasMany('App/Models/Comment')
  }

  favorite () {
    return this.belongsToMany('App/Models/Article')
  }

  following () {
    return this.belongsToMany('App/Models/User', 'follower_id', 'followed_id')
      .pivotTable('follows')
  }

  followers () {
    return this.belongsToMany('App/Models/User', 'followed_id', 'follower_id')
      .pivotTable('follows')
  }
}

module.exports = User
