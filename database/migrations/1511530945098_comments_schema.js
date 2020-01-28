'use strict'

const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('article_id').unsigned().notNullable()
      table.text('body').notNullable()
      table.timestamp('createdAt').defaultTo(this.fn.now())
      table.timestamp('updatedAt').defaultTo(this.fn.now())

      table.foreign('user_id')
        .references('users.id')
        .onDelete('cascade')

      table.foreign('article_id')
        .references('articles.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.dropTableIfExists('comments')
  }
}

module.exports = CommentsSchema
