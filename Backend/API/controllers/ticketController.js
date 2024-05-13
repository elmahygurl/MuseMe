const ticket = require('../models/ticket');

exports.getMuseumTicketsByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const museumTickets = await ticket.getMuseumTicketsByUsername(username);
    res.json(museumTickets);
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};

exports.getEventTicketsByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const ticketssM = await ticket.getEventTicketsByUsername(username);
    res.json(ticketssM);
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
  
};


exports.createTicket = async (req, res) => {
  console.log("ticket controller start");
  const TicketData = req.body;
  const username = TicketData.username;
  const tableName = TicketData.tableName;
  console.log("Request body:", req.body); 
  const selectedOption = TicketData.selectedOption;
  const numberOfTickets = TicketData.numberOfTickets;
  try {
    // Loop to create the specified number of tickets
    for (let i = 0; i < numberOfTickets; i++) {
      const Ticket = await ticket.createTicket(username, tableName, selectedOption, numberOfTickets);
      // Optionally, you can log each ticket creation or handle them as needed
      console.log(`Ticket ${i + 1} created successfully.`);
    }
    // If you need to return a response after all tickets are created, you can do so here
    // For example, you might want to return a success message or the details of the last ticket created
    res.status(201).json({ message: `Successfully created ${numberOfTickets} tickets.` });
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




// exports.getAllEventsTickets = async (req, res) => {
//   try {
//     const ticketssE = await tickets.getAllEventsTickets();
//     res.status(200).json(ticketssE);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };