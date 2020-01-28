'use strict'
const Model = use('Model')

class Article extends Model {
  static boot () {
    super.boot()
    this.addGlobalScope(builder => {
      builder.with('favorites')
      builder.with('tagList')
      builder.with('author.followers')
      builder.withCount('favorites')
    })
    this.addHook('beforeSave', 'Article.slugify')
  }

  static get computed () {
    return ['favoritesCount']
  }

  getFavoritesCount () {
    return this.$sideLoaded.favorites_count
  }

  static get hidden () {
    return ['favorites']
  }

  static get createdAtColumn () {
    return 'createdAt'
  }

  static get updatedAtColumn () {
    return 'updatedAt'
  }

  static formatDates (field, value) {
    return value
  }

  static castDates (field, value) {
    return value
  }

  static scopeBoolFavorited (query, userId) {
    return query.with('favorites', (builder) => {
      builder.where('id', userId)
    })
  }

  static scopeFilterByAuthor (query, authorName) {
    return query.whereHas('author', (builder) => {
      builder.where('username', authorName)
    })
  }

  static scopeFilterByTag (query, tag) {
    return query.whereHas('tagList', (builder) => {
      builder.where('name', tag)
    })
  }

  static scopeFilterByFavorited (query, username) {
    return query.whereHas('favorites', (builder) => {
      builder.where('username', username)
    })
  }

  static scopeFollowersArticle (query, userId) {
    return query.whereHas('author', (builder) => {
      builder.whereHas('followers', (builderAuthor) => {
        builderAuthor.where('id', userId)
      })
    })
  }

  author () {
    return this.belongsTo('App/Models/User')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }

  tagList () {
    return this.belongsToMany('App/Models/Tag')
  }

  favorites () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('favorites')
  }
}

module.exports = Article
