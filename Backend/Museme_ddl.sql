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
CREATE TABLE eventticketpurchase (
    eventTicketId INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    eventID INT NOT NULL,
    purchaseDate DATE NOT NULL,
    FOREIGN KEY (eventID) REFERENCES event(eventID)
    -- Add any additional constraints or foreign keys if necessary
);

-- Table for Ticket purchases by User for Museums
CREATE TABLE museumticketpurchase (
    museumTicketId INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    museumID INT NOT NULL,
    purchaseDate DATE NOT NULL,
    FOREIGN KEY (museumID) REFERENCES museum(museumID)
    -- Add any additional constraints or foreign keys if necessary
);

