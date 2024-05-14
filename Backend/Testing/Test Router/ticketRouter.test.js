const request = require('supertest');
const express = require('express');
const router = require('../../API/routers/ticketRouter');
const TicketController = require('../../API/controllers/ticketController');

// Mock the TicketController methods
jest.mock('../../API/controllers/ticketController');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Ticket Routes', () => {
  it('should create ticket when POST /addTicket is called', async () => {
    const ticketData = { /* provide required data for ticket creation */ };
    TicketController.createTicket.mockImplementationOnce(async (req, res) => {
      res.status(201).json({ message: 'Ticket created successfully' });
    });

    const response = await request(app)
      .post('/addTicket')
      .send(ticketData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Ticket created successfully');
  });

  it('should return Method Not Allowed when GET /addTicket is called', async () => {
    const response = await request(app).get('/addTicket');

    expect(response.status).toBe(405);
    expect(response.body.message).toBe('Method Not Allowed');
  });

  it('should get museum tickets when GET /Mtickets/:username is called', async () => {
    const username = 'testUser';
    const expectedData = { /* provide expected museum tickets data */ };
    TicketController.getMuseumTicketsByUsername.mockImplementationOnce(async (req, res) => {
      res.status(200).json(expectedData);
    });

    const response = await request(app).get(`/Mtickets/${username}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });

  it('should get event tickets when GET /Etickets/:username is called', async () => {
    const username = 'testUser';
    const expectedData = { /* provide expected event tickets data */ };
    TicketController.getEventTicketsByUsername.mockImplementationOnce(async (req, res) => {
      res.status(200).json(expectedData);
    });

    const response = await request(app).get(`/Etickets/${username}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });
});
