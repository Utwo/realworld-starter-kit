'use strict'

const CustomFormatter = require('./CustomFormatter')

class UpdateUser {
  get formatter () {
    return CustomFormatter
  }

  get rules () {
    const userId = this.ctx.auth.user.id

    return {
      email: `email|unique:users,email,id,${userId}`,
      username: `string|unique:users,username,id,${userId}`,
      password: 'min:6',
      image: 'url'
    }
  }

  get data () {
    return this.ctx.request.all().user
  }
}

module.exports = UpdateUser
