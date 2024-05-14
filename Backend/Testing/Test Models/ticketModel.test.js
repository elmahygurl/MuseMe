const db = require('../../API/config/db');
const Ticket = require('../../API/models/ticket');

jest.mock('../../API/config/db');

describe('Ticket Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save ticket data', async () => {
    // Mock database queries
    db.query.mockResolvedValueOnce([[{ userID: 1 }]], null); // Mock user query
    db.query.mockResolvedValueOnce([[{ museumID: 1 }]], null); // Mock museum ID query
    db.query.mockResolvedValueOnce([{ insertId: 1 }], null); // Mock insert query

    // Create ticket instance
    const ticketData = { username: 'testUser', tableName: 'museum', selectedOption: 'museum1' };
    const ticket = new Ticket(ticketData);

    // Call save method
    const ticketID = await ticket.save();

    // Verify database queries were called with correct parameters
    expect(db.query).toHaveBeenCalledWith('SELECT userID FROM User WHERE username = ?', ['testUser']);
    expect(db.query).toHaveBeenCalledWith('SELECT museumID FROM museum WHERE name = ?', ['museum1']);
    expect(db.query).toHaveBeenCalledWith('INSERT INTO museumticketpurchase (userID, museumID, purchaseDate) VALUES (?, ?, NOW())', [1, 1]);

    // Verify ticket ID returned
    expect(ticketID).toBe(1);
  });

  it('should create ticket', async () => {
    // Mock save method
    Ticket.prototype.save = jest.fn().mockResolvedValueOnce(1);
  
    // Call createTicket method
    await Ticket.createTicket('testUser', 'museum', 'museum1', 1);
  
    // Verify save method was called with correct parameters
    expect(Ticket.prototype.save).toHaveBeenCalled();
    expect(Ticket.prototype.save.mock.calls[0].length).toBe(0); // Ensure save method is called with no arguments
  });
  
});
