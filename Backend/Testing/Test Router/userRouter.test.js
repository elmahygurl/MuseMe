const request = require('supertest');
const app = require('../../API/server'); // Assuming your Express app is exported from 'app.js'
const UserController = require('../../API/controllers/userController');

describe('User Router', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    // Add more assertions if needed
  });

  it('should create a new user', async () => {
    const newUser = { username: 'testuser', email: 'test@example.com', password: 'test123', nationality: 'test' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.status).toBe(201);
  });

});
