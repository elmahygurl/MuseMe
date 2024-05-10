const userController = require('../../API/controllers/userController');
const User = require('../../API/models/User');

jest.mock('../../API/models/User');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    const users = [{ id: 1, username: 'User 1' }, { id: 2, username: 'User 2' }];
    User.findAll.mockResolvedValue(users);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await userController.getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('should handle error when getting all users', async () => {
    const errorMessage = 'Database error';
    User.findAll.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await userController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

});
