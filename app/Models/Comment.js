'use strict'

const BaseModel = use('App/Models/BaseModel')

class Comment extends BaseModel {
  article () {
    return this.belongsTo('App/Models/Article')
  }

  author () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Comment
