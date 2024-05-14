const ticketController = require('../../API/controllers/ticketController');
const ticket = require('../../API/models/ticket');

jest.mock('../../API/models/ticket');

describe('Ticket Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get museum tickets by username', async () => {
    const username = 'testUser';
    const museumTickets = [{ id: 1, museumID: 'museum1' }, { id: 2, museumID: 'museum2' }];
    ticket.getMuseumTicketsByUsername.mockResolvedValue(museumTickets);

    const req = { params: { username } };
    const res = { json: jest.fn() };

    await ticketController.getMuseumTicketsByUsername(req, res);

    expect(res.json).toHaveBeenCalledWith(museumTickets);
  });

  // Similar tests for other functions...
});
