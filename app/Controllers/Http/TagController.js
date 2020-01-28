'use strict'

const { transformer } = use('@transformer')
const Tag = use('App/Models/Tag')

class TagController {
  async index () {
    const tags = await Tag.all()
    return transformer({ tags }, -1)
  }
}

module.exports = TagController
