/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './route

s/cart'
| import './routes/customer'

|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
 Route.post('/registrarUsuario', 'UsersController.crearUsuarios')
 Route.post('/login', 'UsersController.login')
 
}
).prefix('/user')




//Route.post('/logout', 'UsersController.logout').middleware('auth:api')

Route.post('/logout', async ({ auth }) => {
  await auth.use('api').revoke()
auth.use('api').isLoggedOut

  
  return {
    revoked: true
  }
})