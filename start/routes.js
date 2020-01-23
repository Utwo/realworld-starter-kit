'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.post('users/login', 'AuthController.login')
Route.post('users', 'AuthController.register').validator('StoreUser')

Route.get('tags', 'TagController.index')

Route.group(() => {
  Route.get('articles/feed', 'ArticleController.feed')
  Route.post('articles', 'ArticleController.store').validator('StoreArticle')
  Route.put('articles/:slug', 'ArticleController.update')
  Route.delete('articles/:slug', 'ArticleController.destroy')

  Route.post('articles/:slug/favorite', 'FavoriteController.store')
  Route.delete('articles/:slug/favorite', 'FavoriteController.destroy')

  Route.get('user', 'UserController.index')
  Route.put('user', 'UserController.update').validator('UpdateUser')

  Route.post('profiles/:user/follow', 'ProfileController.follow')
  Route.delete('profiles/:user/follow', 'ProfileController.unfollow')

  Route.get('articles/:slug/comments', 'CommentController.index')
  Route.post('articles/:slug/comments', 'CommentController.store').validator('StoreComment')
  Route.delete('articles/:slug/comments/:comment', 'CommentController.destroy')
}).middleware('auth')

Route.group(() => {
  Route.get('articles', 'ArticleController.index')
  Route.get('profiles/:user', 'ProfileController.show')
  Route.get('articles/:slug', 'ArticleController.find')
}).middleware('optionalAuth')
