'use strict'

const CustomFormatter = require('./CustomFormatter')

class StoreComment {
  get formatter () {
    return CustomFormatter
  }

  get rules () {
    return {
      body: 'required'
    }
  }

  get data () {
    return this.ctx.request.all().comment
  }
}

module.exports = StoreComment
