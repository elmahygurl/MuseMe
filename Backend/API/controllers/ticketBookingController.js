const ticket = require('../models/ticket');

exports.getAllMuseumTickets = async (req, res) => {
  try {
    const museumTickets = await ticket.findAll();
    res.json(museumTickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMuseumTicketByAttributes = async (req, res) => {
  const attributes = req.body; // Assuming attributes are passed in the request body
  try {
    const museumTicket = await ticket.findByAttributes(attributes);
    if (museumTicket) {
      res.json(museumTicket);
    } else {
      res.status(404).json({ message: 'Museum ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTicket = async (req, res) => {
  const TicketData = req.body;
  const username = TicketData.username;
  const tableName = TicketData.tableName;
  console.log("Request body:", req.body); 
  const selectedOption = TicketData.selectedOption;
  const numberOfTickets = TicketData.numberOfTickets;
  try {
    const Ticket = await ticket.createTicket(username,tableName,selectedOption,numberOfTickets);
    res.status(201).json(Ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateMuseumTicket = async (req, res) => {
  const { userID, museumID } = req.params;
  const museumTicketData = req.body;
  try {
    await ticket.updateByAttributes({ userID, museumID }, museumTicketData);
    res.json({ message: 'Museum ticket updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMuseumTicket = async (req, res) => {
  const { userID, museumID } = req.params;
  try {
    await ticket.deleteByAttributes({ userID, museumID });
    res.json({ message: 'Museum ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
