'use strict'

const { uppercaseFirst } = use('@helper/string')
const { transformer } = use('@transformer')

const Article = use('App/Models/Article')
const Tag = use('App/Models/Tag')
const Config = use('Config')

class ArticleController {
  async index ({ request, auth }) {
    const { offset = Config.get('app.page.offset'), limit = Config.get('app.page.limit') } = request.get()
    const articleQuery = this.filterByQueryString(request, Article.query())
    const articlesCount = await articleQuery.getCount('id')
    const articles = await articleQuery.orderBy('createdAt', 'desc').offset(offset).limit(limit).fetch()
    return transformer({ articles, articlesCount }, auth.user.id)
  }

  async feed ({ auth, request }) {
    const { offset = Config.get('app.page.offset'), limit = Config.get('app.page.limit') } = request.get()
    const articleQuery = Article.query().followersArticle(auth.user.id)
    const articlesCount = await articleQuery.getCount('id')
    const articles = await articleQuery.orderBy('createdAt', 'desc').offset(offset).limit(limit).fetch()
    return transformer({ articles, articlesCount }, auth.user.id)
  }

  filterByQueryString (request, query) {
    const queryParams = request.get()
    for (const queryParam of Object.entries(queryParams)) {
      const methodName = uppercaseFirst(queryParam[0])
      const func = `filterBy${methodName}`
      if (typeof query[func] === 'function') { query[func](queryParam[1]) }
    }
    return query
  }

  async find ({ params, auth }) {
    return this.findArticleBySlug(params.slug, auth.user.id)
  }

  async findArticleBySlug (slug, userId) {
    const article = await Article.findByOrFail('slug', slug)
    return transformer({ article }, userId)
  }

  async store ({ request, auth }) {
    const articleData = request.only('article').article
    const tagList = articleData.tagList
    delete articleData.tagList
    articleData.user_id = auth.user.id
    const article = await Article.create(articleData)
    if (tagList) {
      await this.createTagIfNotExist(tagList, article)
    }
    return this.findArticleBySlug(article.slug, auth.user.id)
  }

  async createTagIfNotExist (tagList, article) {
    const tagsId = []
    for (const tagName of tagList) {
      const tag = await Tag.findOrCreate({ name: tagName }, { name: tagName })
      tagsId.push(tag.id)
    }
    return article.tagList().attach(tagsId)
  }

  async update ({ params, auth, request, response }) {
    const article = await Article.findByOrFail('slug', params.slug)
    if (article.user_id !== auth.user.id) {
      return response.unauthorized({ message: 'Can\'t update this article' })
    }
    const { title, description, body } = request.only('article').article
    article.merge({ title, description, body })
    await article.save()
    return this.findArticleBySlug(article.slug, auth.user.id)
  }

  async destroy ({ params, auth, response }) {
    const article = await Article.findByOrFail('slug', params.slug)
    if (article.user_id !== auth.user.id) {
      return response.unauthorized({ message: 'Can\'t delete this article' })
    }
    await article.delete()
    return { article }
  }
}

module.exports = ArticleController
