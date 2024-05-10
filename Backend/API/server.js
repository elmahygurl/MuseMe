const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Setup session
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//     },
//   })
// );

app.use(cors({
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(express.static('signin.html')); // Serve files from the 'public' directory

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming strategy
  },
});

const imageFilter = function (req, file, cb) {
  // Get the file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Check if the file type is an image with a valid extension
  if (
    file.mimetype.startsWith('image/') &&
    ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)
  ) {
    cb(null, true);
  } else {
    cb(new Error('File type or extension not supported!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 },
});
app.get('/', (req, res) => {
  res.status(200).json({ hi: 'welcome' });
});

app.use(session({
  secret: 'ToPsEcREt',  // Replace 'yourSecretKey' with a real, strong secret string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if you're using HTTPS
}));
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout successful' });
    }
  });
});

app.get('/checkSession', (req, res) => {
  const sessionExists = req.session.auth ? true : false;
  res.status(200).json({ sessionExists });
});

app.listen(5000, () => console.log(`Server running on http://localhost:5000/`));

// Routers
const MuseumRouter = require('./routers/museumRouter');
const AdminRouter = require('./routers/adminRouter');
const UserRouter = require('./routers/userRouter');
const EventRouter = require('./routers/eventRouter');
// const MuseumTicketRouter = require('./routers/museumticketRouter');
// const EventTicketRouter = require('./routers/eventticketpurchaseRouter');
const TicketBookingRouter = require('./routers/ticketBookingRouter');


// Mounting routers
app.use('/museums', MuseumRouter);
app.use('/admin', AdminRouter);
app.use('/users', UserRouter);
app.use('/events', EventRouter);
// app.use('/museumtickets', MuseumTicketRouter);
// app.use('/eventtickets', EventTicketRouter);
app.use('/ticketBooking', TicketBookingRouter);