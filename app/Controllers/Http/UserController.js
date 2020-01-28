'use strict'

const { transformer } = use('@transformer')

class UserController {
  async index ({ auth }) {
    let user = auth.user
    user.token = await auth.generate(user)
    user = { email: user.email, ...user.toJSON() }
    return transformer({ user }, auth.user.id)
  }

  async update ({ request, auth }) {
    const user = auth.user
    const requestData = request.only(['user.username', 'user.password', 'user.email', 'user.image', 'user.bio']).user
    user.merge(requestData)
    await user.save()
    return this.index({ auth })
  }
}

module.exports = UserController
