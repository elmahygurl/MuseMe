const Museum = require('../models/Museum');

exports.getAllMuseums = async (req, res) => {
  try {
    const museums = await Museum.getAllMuseums();
    res.status(200).json(museums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMuseumByAttributes = async (req, res) => {
  const attribute = req.query.attribute; // Extract the attribute from the query parameter
  const value = req.query.value; // Extract the value from the query parameter

  try {
    if (!attribute || !value) {
      return res.status(400).json({ error: 'Both attribute and value are required.' });
    }

    const attributes = { [attribute]: value };
    const museum = await Museum.findByAttributes(attributes);
    res.status(200).json(museum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMuseum = async (req, res) => {
  const museumData = req.body; // Assuming museum data is sent in the request body

  try {
    const museum = await Museum.addMuseum(museumData);
    res.status(200).json(museum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMuseum = async (req, res) => {
  const { id } = req.params;
  const museumData = req.body; // Assuming museum data is sent in the request body

  try {
    await Museum.updateByAttributes({ museumID: id }, museumData);
    res.status(200).json({ message: 'Museum updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMuseum = async (req, res) => {
  const { id } = req.params;

  try {
    await Museum.deleteByAttributes({ museumID: id });
    res.status(200).json({ message: 'Museum deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
