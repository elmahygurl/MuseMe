const Museum = require('../models/Museum');

exports.getAllMuseums = async (req, res) => {
  try {
    const museums = await Museum.findAll();
    res.json(museums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMuseumByAttributes = async (req, res) => {
  const attributes = req.body; // Assuming attributes are passed in the request body
  try {
    const museum = await Museum.findByAttributes(attributes);
    if (museum) {
      res.json(museum);
    } else {
      res.status(404).json({ message: 'Museum not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMuseum = async (req, res) => {
  const museumData = req.body;
  try {
    const museum = await Museum.addMuseum(museumData);
    res.status(201).json(museum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMuseum = async (req, res) => {
  const { id } = req.params;
  const museumData = req.body;
  try {
    await Museum.updateByAttributes({ museumID: id }, museumData);
    res.json({ message: 'Museum updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMuseum = async (req, res) => {
  const { id } = req.params;
  try {
    await Museum.deleteByAttributes({ museumID: id });
    res.json({ message: 'Museum deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
