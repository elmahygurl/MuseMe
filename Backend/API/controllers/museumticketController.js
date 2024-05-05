const MuseumTicketPurchase = require('../models/museumTicketPurchase');

exports.getAllMuseumTickets = async (req, res) => {
  try {
    const museumTickets = await MuseumTicketPurchase.findAll();
    res.json(museumTickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMuseumTicketByAttributes = async (req, res) => {
  const attributes = req.body; // Assuming attributes are passed in the request body
  try {
    const museumTicket = await MuseumTicketPurchase.findByAttributes(attributes);
    if (museumTicket) {
      res.json(museumTicket);
    } else {
      res.status(404).json({ message: 'Museum ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMuseumTicket = async (req, res) => {
  const museumTicketData = req.body;
  try {
    const museumTicket = await MuseumTicketPurchase.createMuseumTicket(museumTicketData);
    res.status(201).json(museumTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMuseumTicket = async (req, res) => {
  const { userID, museumID } = req.params;
  const museumTicketData = req.body;
  try {
    await MuseumTicketPurchase.updateByAttributes({ userID, museumID }, museumTicketData);
    res.json({ message: 'Museum ticket updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMuseumTicket = async (req, res) => {
  const { userID, museumID } = req.params;
  try {
    await MuseumTicketPurchase.deleteByAttributes({ userID, museumID });
    res.json({ message: 'Museum ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
