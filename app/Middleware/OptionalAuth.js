'use strict'

class OptionalAuth {
  async handle ({ request, auth }, next) {
    if (request.header('authorization')) {
      // only authenticate if authorization header is present
      await auth.check()
    } else {
      // if authorization header is not present, make auth.user.id = -1 (no user)
      auth.user = { id: -1 }
    }
    await next()
  }
}

module.exports = OptionalAuth
