'use strict'

const { test, trait } = use('Test/Suite')('Login')
const Factory = use('Factory')

trait('Test/ApiClient')

test('Should return the user data with valid credentials', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const data = {
    user: {
      email: user.email,
      password: 'secret'
    }
  }

  const response = await client.post('/users/login').send(data).end()

  response.assertStatus(200)

  assert.nestedProperty(response.body, 'user.token')

  response.assertJSONSubset({
    user: {
      email: user.email,
      username: user.username
    }
  })
})
