'use strict'

const Article = use('App/Models/Article')
const ArticleController = use('App/Controllers/Http/ArticleController')

class FavoriteController {
  async store ({ params, auth }) {
    const article = await Article.findByOrFail('slug', params.slug)
    await article.favorites().attach([auth.user.id])
    const articleController = new ArticleController()
    return articleController.find({ params, auth })
  }

  async destroy ({ params, auth }) {
    const article = await Article.findByOrFail('slug', params.slug)
    await article.favorites().detach([auth.user.id])
    const articleController = new ArticleController()
    return articleController.find({ params, auth })
  }
}

module.exports = FavoriteController
