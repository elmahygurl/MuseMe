const eventController = require('../../API/controllers/eventController');
const Event = require('../../API/models/Event');

jest.mock('../../API/models/Event');

describe('Event Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle error when getting all events', async () => {
    const errorMessage = 'Database error';
    Event.getAllEvents.mockRejectedValue(new Error(errorMessage));
  
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);
  
    await eventController.getAllEvents(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage }); // Update this line
  });
  
  

  it('should handle error when getting all events', async () => {
    const errorMessage = 'Database error';
    Event.getAllEvents.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await eventController.getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

});
