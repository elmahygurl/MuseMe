const db = require('../config/db');

class Museum {
    constructor(museumID, name, location, governate, museumType, description, daysOff, openingHours, ticketPrice) {
        this.museumID = museumID;
        this.name = name;
        this.location = location;
        this.governate = governate;
        this.museumType = museumType;
        this.description = description;
        this.daysOff = daysOff;
        this.openingHours = openingHours;
        this.ticketPrice = ticketPrice;
    }

    async save() {
        try {
            const result = await query('INSERT INTO museum SET ?', this);
            return result.insertId;
        } catch (error) {
            throw new Error(`Error saving museum: ${error.message}`);
        }
    }


    static async getAllMuseums() {      //this function has been tested, works
        try {
            const [museums] = await db.query('SELECT * FROM museum'); 
            return museums;
        } catch (error) {
            console.error('Error in Museum.getAllMuseums:', error);
            throw new Error(`Error retrieving museums: ${error.message}`);
        }
    }

    static async findByAttributes(attributes) {
        try {
            const queryStr = 'SELECT * FROM museum WHERE ?';
            const museums = await query(queryStr, attributes);
            return museums;
        } catch (error) {
            throw new Error(`Error finding museums by attributes: ${error.message}`);
        }
    }

    static async deleteByAttributes(attributes) {
        try {
            const queryStr = 'DELETE FROM museum WHERE ?';
            const result = await query(queryStr, attributes);
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Error deleting museums by attributes: ${error.message}`);
        }
    }

    static async updateByAttributes(attributes, newValues) {
        try {
            const queryStr = 'UPDATE museum SET ? WHERE ?';
            const result = await query(queryStr, [newValues, attributes]);
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Error updating museums by attributes: ${error.message}`);
        }
    }

    static async addMuseum(museum) {
        try {
            const newMuseum = new Museum(museum.museumID, museum.name, museum.location, museum.governate, museum.museumType, museum.description, museum.daysOff, museum.openingHours, museum.ticketPrice);
            const museumID = await newMuseum.save();
            return museumID;
        } catch (error) {
            throw new Error(`Error adding museum: ${error.message}`);
        }
    }
}


module.exports = Museum;