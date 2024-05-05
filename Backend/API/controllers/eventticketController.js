const EventTicketPurchase = require('../models/eventTicketPurchase');

exports.getAllEventTickets = async (req, res) => {
  try {
    const eventTickets = await EventTicketPurchase.findAll();
    res.json(eventTickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventTicketByAttributes = async (req, res) => {
  const attributes = req.body; // Assuming attributes are passed in the request body
  try {
    const eventTicket = await EventTicketPurchase.findByAttributes(attributes);
    if (eventTicket) {
      res.json(eventTicket);
    } else {
      res.status(404).json({ message: 'Event ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEventTicket = async (req, res) => {
  const eventTicketData = req.body;
  try {
    const eventTicket = await EventTicketPurchase.createEventTicket(eventTicketData);
    res.status(201).json(eventTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEventTicket = async (req, res) => {
  const { userID, eventID } = req.params;
  const eventTicketData = req.body;
  try {
    await EventTicketPurchase.updateByAttributes({ userID, eventID }, eventTicketData);
    res.json({ message: 'Event ticket updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEventTicket = async (req, res) => {
  const { userID, eventID } = req.params;
  try {
    await EventTicketPurchase.deleteByAttributes({ userID, eventID });
    res.json({ message: 'Event ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
