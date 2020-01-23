'use strict'

const { sanitizor } = use('Validator')
const Article = use('App/Models/Article')
const ArticleHook = module.exports = {}

/**
 * Slugify article title
 *
 * @method
 *
 * @param  {Object} articleInstance
 *
 * @return {void}
 */
ArticleHook.slugify = async (articleInstance) => {
  if (articleInstance.title) {
    let slug = sanitizor.slug(articleInstance.title)
    const otherArticle = await Article.findBy('slug', slug)
    if (otherArticle) {
      slug += '_' + Math.random().toString(36).substr(2, 6)
    }
    articleInstance.slug = slug
  }
}
