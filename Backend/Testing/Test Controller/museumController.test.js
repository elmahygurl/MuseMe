const museumController = require('../../API/controllers/museumController');
const Museum = require('../../API/models/Museum');

jest.mock('../../API/models/Museum');

describe('Museum Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all museums', async () => {
    const museums = [{ id: 1, name: 'Museum 1' }, { id: 2, name: 'Museum 2' }];
    Museum.getAllMuseums.mockResolvedValue(museums);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await museumController.getAllMuseums(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(museums);
  });

  it('should handle error when getting all museums', async () => {
    const errorMessage = 'Database error';
    Museum.getAllMuseums.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await museumController.getAllMuseums(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

});
