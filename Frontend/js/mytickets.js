// Function to fetch museum tickets data from backend API
function fetchMuseumTickets() {
  fetch('http://localhost:5000/tickets/Mtickets')
    .then(response => response.json())
    .then(data => {
      renderMuseumTickets(data);
    })
    .catch(error => console.error('Error fetching museum tickets:', error));
}

// Function to render museum tickets on the page
function renderMuseumTickets(museumTickets) {
  const museumTicketList = document.getElementById('museumTicketList');
  museumTicketList.innerHTML = '';

  museumTickets.forEach(ticket => {
    const ticketCard = document.createElement('div');
    ticketCard.classList.add('col-md-6', 'mb-4');
    ticketCard.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Ticket ID: ${ticket.id}</h5>
                  <p class="card-text"><strong>Username:</strong> ${ticket.username}</p>
                  <p class="card-text"><strong>Museum Name:</strong> ${ticket.museumName}</p>
                  <p class="card-text"><strong>Date of Purchase:</strong> ${ticket.dateOfPurchase}</p>
              </div>
          </div>
      `;
    museumTicketList.appendChild(ticketCard);
  });
}

// Function to fetch events tickets data from backend API
function fetchEventsTickets() {
  fetch('http://localhost:5000/tickets/Etickets')
    .then(response => response.json())
    .then(data => {
      renderEventsTickets(data);
    })
    .catch(error => console.error('Error fetching events tickets:', error));
}

// Function to render events tickets on the page
function renderEventsTickets(eventsTickets) {
  const eventsTicketList = document.getElementById('eventsTicketList');
  eventsTicketList.innerHTML = '';

  eventsTickets.forEach(ticket => {
    const ticketCard = document.createElement('div');
    ticketCard.classList.add('col-md-6', 'mb-4');
    ticketCard.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Ticket ID: ${ticket.id}</h5>
                  <p class="card-text"><strong>Username:</strong> ${ticket.username}</p>
                  <p class="card-text"><strong>Event Name:</strong> ${ticket.eventName}</p>
                  <p class="card-text"><strong>Starting Date:</strong> ${ticket.startingDate}</p>
                  <p class="card-text"><strong>Ending Date:</strong> ${ticket.endingDate}</p>
                  <p class="card-text"><strong>Date of Purchase:</strong> ${ticket.dateOfPurchase}</p>
              </div>
          </div>
      `;
    eventsTicketList.appendChild(ticketCard);
  });
}

// Function to decode token and extract username
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Function to fetch tickets based on user's token
function fetchTicketsByUserToken() {
  const token = localStorage.getItem('token');
  if (token) {
    const username = decodeToken(token);
    console.log(username);
    if (username) {
      fetchMuseumTickets(username);
      fetchEventsTickets(username);
    } else {
      console.error('Unable to decode username from token');
    }
  } else {
    console.error('Token not found in localStorage');
  }
}

// Call fetchTicketsByUserToken function when the page loads
document.addEventListener('DOMContentLoaded', fetchTicketsByUserToken);
