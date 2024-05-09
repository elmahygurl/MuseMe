// user.js

const db = require('../config/db');


class User {
    constructor(userData) {
        if (userData) {
            this.userID = userData.userID;
            this.username = userData.username;
            this.email = userData.email;
            this.password = userData.password;
            this.nationality = userData.nationality;
        }
    }

    async save() {
        try {
            const query = 'INSERT INTO User (username, email, password, nationality) VALUES (?, ?, ?, ?)';
            const values = [this.username, this.email, this.password, this.nationality];
            const [result] = await db.query(query, values);
            this.userID = result.insertId;
            return this.userID;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM User');
            return rows.map(row => new User(row));
        } catch (error) {
            throw error;
        }
    }

    static async findByAttributes(attributes) {
        try {
            const query = 'SELECT * FROM User WHERE ';
            const conditions = Object.keys(attributes).map(key => `${key} = ?`).join(' AND ');
            const values = Object.values(attributes);
            const [rows] = await db.query(`${query}${conditions}`, values);
            return rows.map(row => new User(row));
        } catch (error) {
            throw error;
        }
    }

    static async deleteByAttributes(attributes) {
        try {
            const query = 'DELETE FROM User WHERE ';
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
            await db.query(`UPDATE User SET ${updateColumns} WHERE ${conditions}`, values);
        } catch (error) {
            throw error;
        }
    }
    static async findByUsername(username) {
        try {
            const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
            if (rows.length > 0) {
                return rows[0]; // Return the first user found
            } else {
                return null; // Return null if no user is found
            }
        } catch (error) {
            throw error;
        }
    }
    static async createUser(username, email, password, nationality) {
        try {
            const user = new User({ username, email, password, nationality });
            const userID = await user.save();
            return userID;

        } catch (error) {
            console.error("Error creating user:", error);
            throw error; // You might want to throw a more specific error or handle it differently
        }

    }
}

module.exports = User;
