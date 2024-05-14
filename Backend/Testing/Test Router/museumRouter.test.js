const request = require('supertest');
const express = require('express');
const router = require('../../API/routers/museumRouter');
const MuseumController = require('../../API/controllers/museumController');

// Mock the MuseumController methods
jest.mock('../../API/controllers/museumController');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Museum Routes', () => {
  it('should get all museums when GET / is called', async () => {
    const expectedData = [{ /* provide expected museum data */ }];
    MuseumController.getAllMuseums.mockImplementationOnce(async (req, res) => {
      res.status(200).json(expectedData);
    });

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });

  it('should search for museum by attributes when GET /search is called', async () => {
    const attributes = { /* provide attributes for museum search */ };
    const expectedData = [{ /* provide expected museum data */ }];
    MuseumController.getMuseumByAttributes.mockImplementationOnce(async (req, res) => {
      res.status(200).json(expectedData);
    });

    const response = await request(app)
      .get('/search')
      .send(attributes);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedData);
  });

  it('should create museum when POST /create is called', async () => {
    const museumData = { /* provide required data for museum creation */ };
    MuseumController.createMuseum.mockImplementationOnce(async (req, res) => {
      res.status(201).json({ message: 'Museum created successfully' });
    });

    const response = await request(app)
      .post('/create')
      .send(museumData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Museum created successfully');
  });

  it('should update museum when PUT /update/:id is called', async () => {
    const museumId = '123'; // provide an example museum ID
    const museumData = { /* provide required data for museum update */ };
    MuseumController.updateMuseum.mockImplementationOnce(async (req, res) => {
      res.status(200).json({ message: 'Museum updated successfully' });
    });

    const response = await request(app)
      .put(`/update/${museumId}`)
      .send(museumData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Museum updated successfully');
  });

  it('should delete museum when DELETE /delete/:id is called', async () => {
    const museumId = '123'; // provide an example museum ID
    MuseumController.deleteMuseum.mockImplementationOnce(async (req, res) => {
      res.status(200).json({ message: 'Museum deleted successfully' });
    });

    const response = await request(app).delete(`/delete/${museumId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Museum deleted successfully');
  });
});
