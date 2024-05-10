const db = require('../config/db');

class ticket{
  constructor(ticketData) {
    if (ticketData) {
        this.username = ticketData.username;
        this.tableName= ticketData.tableName;
        this.selectedOption = ticketData.selectedOption;
    }
  }
  async save() {
    try {
        let table = '';
        let idFieldName = '';
        let idValue = '';

        // Determine the table name and ID field based on tableName
        if (this.tableName === 'event') {
            table = 'eventticketpurchase';
            idFieldName = 'eventID';
        } else if (this.tableName === 'museum') {
            table = 'museumticketpurchase';
            idFieldName = 'museumID';
        } else {
            throw new Error('Invalid tableName');
        }

        // Get the userID based on the username
        const userQuery = 'SELECT userID FROM User WHERE username = ?';
        const userValues = [this.username];
        const [userResult] = await db.query(userQuery, userValues);
        const userID = userResult[0].userID;

        // Get the museumID or eventID based on the selectedOption
        const idQuery = `SELECT ${idFieldName} FROM ${this.tableName} WHERE name = ?`;
        const idValues = [this.selectedOption];
        const [idResult] = await db.query(idQuery, idValues);
        idValue = idResult[0][idFieldName];

        // Insert ticket data into the respective table
        const insertQuery = `INSERT INTO ${table} (userID, ${idFieldName}, purchaseDate) VALUES (?, ?, NOW())`;
        const insertValues = [userID, idValue];
        const [insertResult] = await db.query(insertQuery, insertValues);

        // Return the inserted ticket ID
        return insertResult.insertId;
    } catch (error) {
        throw error;
    }
}
  static async createTicket(username,tableName,selectedOption,numberOfTickets) {
    try {
        const tickett = new ticket({username,tableName,selectedOption,numberOfTickets});
        const ticketID = await tickett.save();
        return ticketID;

    } catch (error) {
        console.error("Error creating ticket (we're in model):", error);
        throw error; // You might want to throw a more specific error or handle it differently
    }

}

}