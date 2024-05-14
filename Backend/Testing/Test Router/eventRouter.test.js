const request = require('supertest');
const express = require('express');
const router = require('../../API/routers/eventRouter');
const EventController = require('../../API/controllers/eventController');

// Mock the EventController methods
jest.mock('../../API/controllers/eventController');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Event Routes', () => {
  it('should get all events when GET / is called', async () => {
    const expectedData = [{ /* provide expected event data */ }];
    EventController.getAllEvents.mockImplementationOnce(async (req, res) => {
      res.status(200).json(expectedData);
    });

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });

  it('should create event when POST /create is called', async () => {
    const eventData = { /* provide required data for event creation */ };
    EventController.createEvent.mockImplementationOnce(async (req, res) => {
      res.status(201).json({ message: 'Event created successfully' });
    });

    const response = await request(app)
      .post('/create')
      .send(eventData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Event created successfully');
  });

  it('should delete event when DELETE /delete is called', async () => {
    const eventId = '123'; // provide an example event ID
    EventController.deleteEvent.mockImplementationOnce(async (req, res) => {
      res.status(200).json({ message: 'Event deleted successfully' });
    });

    const response = await request(app).delete(`/delete?id=${eventId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event deleted successfully');
  });

  it('should update event when PUT /update/:id is called', async () => {
    const eventId = '123'; // provide an example event ID
    const eventData = { /* provide required data for event update */ };
    EventController.updateEvent.mockImplementationOnce(async (req, res) => {
      res.status(200).json({ message: 'Event updated successfully' });
    });

    const response = await request(app)
      .put(`/update/${eventId}`)
      .send(eventData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event updated successfully');
  });

  it('should search for event by attributes when GET /search is called', async () => {
    const attributes = { /* provide attributes for event search */ };
    const expectedData = [{ /* provide expected event data */ }];
    EventController.getEventByAttributes.mockImplementationOnce(async (req, res) => {
      res.status(200).json(expectedData);
    });

    const response = await request(app)
      .get('/search')
      .send(attributes);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });
});
