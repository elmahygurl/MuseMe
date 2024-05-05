const Admin = require('../models/admin');

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminByAttributes = async (req, res) => {
  const attributes = req.body; // Assuming attributes are passed in the request body
  try {
    const admin = await Admin.findByAttributes(attributes);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  const adminData = req.body;
  try {
    const admin = await Admin.createAdmin(adminData);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const adminData = req.body;
  try {
    await Admin.updateByAttributes({ adminID: id }, adminData);
    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.deleteByAttributes({ adminID: id });
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
