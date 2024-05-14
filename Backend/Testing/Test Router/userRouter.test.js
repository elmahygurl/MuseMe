const request = require('supertest');
const app = require('../../API/server'); // Assuming your Express app is exported from 'app.js'
const UserController = require('../../API/controllers/userController');

describe('User Router', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  

});
