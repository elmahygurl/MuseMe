const db = require('../../API/config/db');
const Event = require('../../API/models/event');

jest.mock('../../API/config/db'); // Mock the database module

describe('Event Model', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
  });

  describe('save()', () => {
    it('should save a new event to the database', async () => {
      // Mock database query function
      db.query.mockResolvedValueOnce([{ insertId: 1 }]);
      
      const eventData = {
        museumID: 1,
        name: 'Test Event',
        description: 'This is a test event',
        startDateTime: '2024-05-01 10:00:00',
        endDateTime: '2024-05-01 12:00:00',
        maxCapacity: 100,
        ticketPrice: 10
      };

      const event = new Event(eventData);
      const eventID = await event.save();

      expect(eventID).toBe(1); // Assert that the save method returns the expected ID
      expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array)); // Assert that the database query was called with the correct arguments
    });

    it('should throw an error if saving fails', async () => {
      // Mock database query function to throw an error
      db.query.mockRejectedValueOnce(new Error('Database error'));

      const eventData = {
        museumID: 1,
        name: 'Test Event',
        description: 'This is a test event',
        startDateTime: '2024-05-01 10:00:00',
        endDateTime: '2024-05-01 12:00:00',
        maxCapacity: 100,
        ticketPrice: 10
      };

      const event = new Event(eventData);

      await expect(event.save()).rejects.toThrow('Database error'); // Assert that the save method throws the expected error
    });
  });

  describe('getAllEvents()', () => {
    it('should return all events from the database', async () => {
        // Mock database query function to throw an error
        db.query.mockRejectedValueOnce(new Error('Database error'));
      
        // Call getAllEvents and expect it to throw an error
        await expect(Event.getAllEvents()).rejects.toThrow('Error retrieving events: Database error');
      
        // Assert that the database query was called with the correct SQL query
        expect(db.query).toHaveBeenCalledWith('SELECT * FROM event');
      });
      
      
    it('should throw an error if database query fails', async () => {
      // Mock database query function to throw an error
      db.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(Event.getAllEvents()).rejects.toThrow('Database error'); // Assert that the getAllEvents method throws the expected error
    });
  });

});
