const db = require('../../API/config/db');
const User = require('../../API/models/user');

jest.mock('../../API/config/db'); // Mock the database module

describe('User Model', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
  });

  describe('save()', () => {
    it('should save a new user to the database', async () => {
      // Mock database query function
      db.query.mockResolvedValueOnce([{ insertId: 1 }]);
      
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        nationality: 'Testland'
      };

      const user = new User(userData);
      const userID = await user.save();

      expect(userID).toBe(1); // Assert that the save method returns the expected ID
      expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array)); // Assert that the database query was called with the correct arguments
    });

    it('should throw an error if saving fails', async () => {
      // Mock database query function to throw an error
      db.query.mockRejectedValueOnce(new Error('Database error'));

      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        nationality: 'Testland'
      };

      const user = new User(userData);

      await expect(user.save()).rejects.toThrow('Database error'); // Assert that the save method throws the expected error
    });
  });

  describe('findAll()', () => {
    it('should return all users from the database', async () => {
      // Mock database query function
      const mockUsers = [
        { userID: 1, username: 'user1', email: 'user1@example.com', password: 'password1', nationality: 'Testland1' },
        { userID: 2, username: 'user2', email: 'user2@example.com', password: 'password2', nationality: 'Testland2' }
      ];
      db.query.mockResolvedValueOnce([mockUsers]);
      
      const users = await User.findAll();

      expect(users).toHaveLength(2); // Assert that the findAll method returns the correct number of users
      expect(users[0]).toBeInstanceOf(User); // Assert that each returned object is an instance of User
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM User'); // Assert that the database query was called with the correct SQL query
    });

    it('should throw an error if database query fails', async () => {
      // Mock database query function to throw an error
      db.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(User.findAll()).rejects.toThrow('Database error'); // Assert that the findAll method throws the expected error
    });
  });

  // Add more test cases for other methods as needed
});
