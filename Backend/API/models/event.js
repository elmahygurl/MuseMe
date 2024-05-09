// event.js

const db = require('../config/db'); // Assuming you have a database connection setup

class Event {
    
    constructor(eventData) {
        if (eventData) {
            this.eventID = eventData.eventID;
            this.museumID = eventData.museumID;
            this.name = eventData.name;
            this.description = eventData.description;
            this.startDateTime = eventData.startDateTime;
            this.endDateTime = eventData.endDateTime;
            this.maxCapacity = eventData.maxCapacity;
            this.ticketPrice = eventData.ticketPrice;
        }
    }

    async save() {
        try {
            const query = 'INSERT INTO Event (museumID, name, description, startDateTime, endDateTime, maxCapacity, ticketPrice) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [this.museumID, this.name, this.description, this.startDateTime, this.endDateTime, this.maxCapacity, this.ticketPrice];
            const [result] = await db.query(query, values);
            this.eventID = result.insertId;
            return this.eventID;
        } catch (error) {
            throw error;
        }
    }

    static async getAllEvents() {
        try {
            const [rows] = await db.query('SELECT * FROM event');
            return rows;
        } catch (error) {
            console.error('Error in events.getAllEvents:', error);
            throw new Error(`Error retrieving events: ${error.message}`);
        }
    }


    static async findByAttributes(attributes) {
        try {
            const query = 'SELECT * FROM Event WHERE ';
            const conditions = Object.keys(attributes).map(key => `${key} = ?`).join(' AND ');
            const values = Object.values(attributes);
            const [rows] = await db.query(`${query}${conditions}`, values);
            return rows.map(row => new Event(row));
        } catch (error) {
            throw error;
        }
    }

    static async deleteByAttributes(attributes) {
        try {
            const query = 'DELETE FROM Event WHERE ';
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
            await db.query(`UPDATE Event SET ${updateColumns} WHERE ${conditions}`, values);
        } catch (error) {
            throw error;
        }
    }

    static async addEvent(museumID, name, description, startDateTime, endDateTime, maxCapacity, ticketPrice) {
        try {
            const event = new Event({ museumID, name, description, startDateTime, endDateTime, maxCapacity, ticketPrice });
            const eventID = await event.save();
            return eventID;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Event;
