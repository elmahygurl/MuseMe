const tickets = require('../models/tickets');

exports.getAllMuseumtickets = async (req, res) => {
  try {
    console.log("entered controller");
    const ticketssM = await tickets.getAllMuseumtickets();
    console.log(ticketssM);
    res.status(200).json(ticketssM);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllEventsTickets = async (req, res) => {
  try {
    const ticketssE = await tickets.getAllEventsTickets();
    res.status(200).json(ticketssE);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};