// museumTicketPurchase.js

const db = require('../config/db'); // Assuming you have a database connection setup

class MuseumTicketPurchase {
    constructor(purchaseData) {
        if (purchaseData) {
            this.userID = purchaseData.userID;
            this.museumID = purchaseData.museumID;
            this.purchaseDate = purchaseData.purchaseDate;
        }
    }

    async save() {
        try {
            const query = 'INSERT INTO MuseumTicketPurchase (userID, museumID, purchaseDate) VALUES (?, ?, ?)';
            const values = [this.userID, this.museumID, this.purchaseDate];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM MuseumTicketPurchase');
            return rows.map(row => new MuseumTicketPurchase(row));
        } catch (error) {
            throw error;
        }
    }

    static async findByAttributes(attributes) {
        try {
            const query = 'SELECT * FROM MuseumTicketPurchase WHERE ';
            const conditions = Object.keys(attributes).map(key => `${key} = ?`).join(' AND ');
            const values = Object.values(attributes);
            const [rows] = await db.query(`${query}${conditions}`, values);
            return rows.map(row => new MuseumTicketPurchase(row));
        } catch (error) {
            throw error;
        }
    }

    static async deleteByAttributes(attributes) {
        try {
            const query = 'DELETE FROM MuseumTicketPurchase WHERE ';
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
            await db.query(`UPDATE MuseumTicketPurchase SET ${updateColumns} WHERE ${conditions}`, values);
        } catch (error) {
            throw error;
        }
    }

    static async addMuseumTicketPurchase(userID, museumID, purchaseDate) {
        try {
            const museumTicketPurchase = new MuseumTicketPurchase({ userID, museumID, purchaseDate });
            await museumTicketPurchase.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MuseumTicketPurchase;
