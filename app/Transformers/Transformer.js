const traverse = require('traverse')

function transformer (response, userId) {
  return traverse(response).forEach(function (item) {
    if (typeof item === 'object') {
      try {
        item = item.toJSON()
        this.update(item)
      } catch (e) {
      }
    }
    if (this.key === 'createdAt' || this.key === 'updatedAt') {
      this.block()
    }

    if (this.key === 'followers') {
      if (this.parent.node.id !== userId) {
        const newItem = item.some(user => user.id === userId)
        addKey.call(this, 'following', newItem, response)
      }
      this.delete()
      this.block()
    }

    if (this.key === 'favorites') {
      const newItem = item.some(user => user.id === userId)
      changeKey.call(this, 'favorited', newItem, response)
    }

    if (this.key === 'token' && this.parent.key === 'user') {
      const newItem = item.token
      addKey.call(this, 'token', newItem, response)
    }

    if (this.key === 'tagList' || this.key === 'tags') {
      const tags = []
      for (const tag of item) {
        tags.push(tag.name)
      }
      changeKey.call(this, this.key, tags, response)
    }
  })
}

function addKey (newKey, item, response) {
  const newPath = this.path.slice(0, -1)
  for (const path of newPath) {
    if (response[path]) {
      response = response[path]
    }
  }
  response[newKey] = item
}

function changeKey (newKey, item, response) {
  addKey.call(this, newKey, item, response)
  if (newKey !== this.key) {
    this.delete()
  }
}

module.exports = { transformer }
