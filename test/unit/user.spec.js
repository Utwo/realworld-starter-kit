const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')

test('login user', async ({ client }) => {
  const newUser = await User.create({
    username: 'johnjacob',
    email: 'test@test.com',
    password: '123123'
  })

  const response = await client.post('/users/login').send({
    user: {
      email: newUser.email,
      password: '123123'
    }
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    user: {
      email: newUser.email,
      username: newUser.username
    }
  })
})
