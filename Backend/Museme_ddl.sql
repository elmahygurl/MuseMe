-- Table for Admin
CREATE TABLE Admin (
    adminID INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table for User
CREATE TABLE `User` (
    userID INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nationality VARCHAR(50)
);

-- Table for Museum
CREATE TABLE Museum (
    museumID INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    governate VARCHAR(255),
    museumType VARCHAR(50),
    description TEXT,
    daysOff VARCHAR(50),
    openingHours VARCHAR(100),
    ticketPrice DECIMAL(10, 2)
);

-- Updated Event table with DATETIME for start and end times
CREATE TABLE `Event` (
    eventID INT PRIMARY KEY,
    museumID INT, 
    name VARCHAR(255) NOT NULL,
    description TEXT,
    startDateTime DATETIME,  -- Starting date and time
    endDateTime DATETIME,    -- Ending date and time
    maxCapacity INT,
    ticketPrice DECIMAL(10, 2),
    FOREIGN KEY (museumID) REFERENCES Museum(museumID)
);

-- Table for Ticket purchases by User for Events
CREATE TABLE EventTicketPurchase (
    userID INT,
    eventID INT,
    purchaseDate DATE,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (eventID) REFERENCES Event(eventID),
    PRIMARY KEY (userID, eventID)
);

-- Table for Ticket purchases by User for Museums
CREATE TABLE MuseumTicketPurchase (
    userID INT,
    museumID INT,
    purchaseDate DATE,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (museumID) REFERENCES Museum(museumID),
    PRIMARY KEY (userID, museumID)
);

