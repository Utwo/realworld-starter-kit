'use strict'

const { transformer } = use('@transformer')
const User = use('App/Models/User')

class AuthController {
  async login ({ request, auth }) {
    const { email, password } = request.all().user
    const token = await auth.attempt(email, password)

    let user = await User.findBy('email', email)
    user = { email: user.email, token, ...user.toJSON() }
    return transformer({ user }, user.id)
  }

  async register ({ request, auth }) {
    const newUser = new User()
    newUser.fill(request.only(['user.username', 'user.password', 'user.email']).user)
    await newUser.save()
    const token = await auth.generate(newUser)

    let user = await User.find(newUser.id)
    user = { email: user.email, token, ...user.toJSON() }
    return transformer({ user }, user.id)
  }
}

module.exports = AuthController
