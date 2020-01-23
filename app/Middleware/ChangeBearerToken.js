'use strict'

class ChangeBearerToken {
  // small hack for auth with jwt even when Token is send instead of Bearer
  async handle ({ request }, next) {
    if (request.header('authorization')) {
      request.headers().authorization = request.header('authorization').replace('Token', 'Bearer')
    }
    await next()
  }
}

module.exports = ChangeBearerToken
