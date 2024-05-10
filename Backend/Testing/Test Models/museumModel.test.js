// museum.test.js

// Import the Museum model
const Museum = require('../../API/models/museum');

// Mock the database query function
jest.mock('../../API/config/db', () => ({
  query: jest.fn(),
}));

describe('Museum Model', () => {
  describe('getAllMuseums', () => {
    it('should return all museums', async () => {
      // Mock the database query result
      const mockMuseums = [
        { museumID: 1, name: 'Museum A', location: 'Location A' },
        { museumID: 2, name: 'Museum B', location: 'Location B' },
      ];
      require('../../API/config/db').query.mockResolvedValueOnce([mockMuseums]);

      // Call the getAllMuseums function
      const museums = await Museum.getAllMuseums();

      // Expect the result to match the mock data
      expect(museums).toEqual(mockMuseums);
    });

    it('should throw an error if there is an error in the database query', async () => {
      // Mock the database query function to throw an error
      require('../../API/config/db').query.mockRejectedValueOnce(new Error('Database error'));

      // Call the getAllMuseums function and expect it to throw an error
      await expect(Museum.getAllMuseums()).rejects.toThrow('Database error');
    });
  });

});
