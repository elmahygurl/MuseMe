
const db = require('../config/db'); // Assuming you have a database connection setup

class EventTicketPurchase {
    constructor(purchaseData) {
        if (purchaseData) {
            this.userID = purchaseData.userID;
            this.eventID = purchaseData.eventID;
            this.purchaseDate = purchaseData.purchaseDate;
        }
    }

    async save() {
        try {
            const query = 'INSERT INTO EventTicketPurchase (userID, eventID, purchaseDate) VALUES (?, ?, ?)';
            const values = [this.userID, this.eventID, this.purchaseDate];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM EventTicketPurchase');
            return rows.map(row => new EventTicketPurchase(row));
        } catch (error) {
            throw error;
        }
    }

    static async findByAttributes(attributes) {
        try {
            const query = 'SELECT * FROM EventTicketPurchase WHERE ';
            const conditions = Object.keys(attributes).map(key => `${key} = ?`).join(' AND ');
            const values = Object.values(attributes);
            const [rows] = await db.query(`${query}${conditions}`, values);
            return rows.map(row => new EventTicketPurchase(row));
        } catch (error) {
            throw error;
        }
    }

    static async deleteByAttributes(attributes) {
        try {
            const query = 'DELETE FROM EventTicketPurchase WHERE ';
            const conditions = Object.keys(attributes).map(key => `${key} = ?`).join(' AND ');
            const values = Object.values(attributes);
            await db.query(`${query}${conditions}`, values);
        } catch (error) {
            throw error;
        }
    }

    static async updateByAttributes(attributes, newValues) {
        try {
            const updateColumns = Object.keys(newValues).map(key => `${key} = ?`).join(', ');
            const conditions = Object.keys(attributes).map(key => `${key} = ?`).join(' AND ');
            const values = [...Object.values(newValues), ...Object.values(attributes)];
            await db.query(`UPDATE EventTicketPurchase SET ${updateColumns} WHERE ${conditions}`, values);
        } catch (error) {
            throw error;
        }
    }

    static async addEventTicketPurchase(userID, eventID, purchaseDate) {
        try {
            const eventTicketPurchase = new EventTicketPurchase({ userID, eventID, purchaseDate });
            await eventTicketPurchase.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EventTicketPurchase;
