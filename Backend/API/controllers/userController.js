const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie'); // Import the js-cookie library
function generateToken(name) {
  const payload = {
    username: name,
  };

  const secretKey = "eriksie";
  const expiresIn = '1m'; // Token expiration time

  return jwt.sign(payload, secretKey, { expiresIn });
}

function generateRefreshToken(name) {
  const payload = {
    username: name,
  };

  const secretKey = "eriksie";
  const expiresIn = '2m'; // Token expiration time
  return jwt.sign(payload, secretKey, { expiresIn }); // Expires in 7 days
}


// Example of using the generateToken function in your login controller
exports.login = async (req, res) => {
  const userData = req.body;
  const username = userData.username;
  const password = userData.password;
  try {
    // Find the user by username in the database
    const user = await User.findByUsername(username);
    console.log(user.password, user.username)
    console.log(password)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure user has a password stored
    if (!user.password) {
      return res.status(401).json({ message: "User has no password stored" });
    }

    // Compare provided password with stored password
    // Assuming you are using bcrypt for password hashing
    //const isMatch = await (password === user.password);
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate JWT token with role information included in the payload
    const token = generateToken(user.username);
    const refreshToken = generateRefreshToken(user.username);
    console.log(token, refreshToken)
    return res.status(200).json({ token, refreshToken });

  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({
      message: "Error while logging in",
      error: error
    });
  }
}


exports.getUserByAttributes = async (req, res) => {
  const attributes = req.body; // Assuming attributes are passed in the request body
  try {
    const user = await User.findByAttributes(attributes);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  const username = userData.username;
  const email = userData.email;
  const password = userData.password
  const nationality = userData.nationality;
  try {

    const user = await User.createUser(username, email, password, nationality);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    await User.updateByAttributes({ userID: id }, userData);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteByAttributes({ userID: id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
