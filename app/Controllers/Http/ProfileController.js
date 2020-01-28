'use strict'

const { transformer } = use('@transformer')
const User = use('App/Models/User')

class ProfileController {
  async show ({ params, auth }) {
    const profile = await User.query().where('username', params.user).with('followers').firstOrFail()
    return transformer({ profile }, auth.user.id)
  }

  async follow ({ params, auth }) {
    const profile = await User.findByOrFail('username', params.user)
    await profile.followers().attach([auth.user.id])
    profile.following = true
    return transformer({ profile }, auth.user.id)
  }

  async unfollow ({ params, auth }) {
    const profile = await User.findByOrFail('username', params.user)
    await profile.followers().detach([auth.user.id])
    profile.following = false
    return transformer({ profile }, auth.user.id)
  }
}

module.exports = ProfileController
