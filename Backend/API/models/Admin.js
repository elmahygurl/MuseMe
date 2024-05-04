// admin.js

const db = require('../config/db.js'); // Assuming you have a database connection setup

class Admin {
    constructor(adminData) {
        if (adminData) {
            this.adminID = adminData.adminID;
            this.email = adminData.email;
            this.password = adminData.password;
        }
    }

    async save() {
        try {
            const query = 'INSERT INTO Admin (email, password) VALUES (?, ?)';
            const values = [this.email, this.password];
            const [result] = await db.query(query, values);
            this.adminID = result.insertId;
            return this.adminID;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM Admin');
            return rows.map(row => new Admin(row));
        } catch (error) {
            throw error;
        }
    }

    static async createAdmin(email, password) {
        try {
            const admin = new Admin({ email, password });
            const adminID = await admin.save();
            return adminID;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Admin;
