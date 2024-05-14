// Function to fetch museum tickets data from backend API
function fetchMuseumTickets(username) {
  fetch(`http://localhost:5000/ticket/Mtickets/${username}`)
    .then(response => response.json())
    .then(data => {
      renderMuseumTickets(data);
    })
    .catch(error => console.error('Error fetching museum tickets:', error));
}

function fetchEventTickets(username) {
  fetch(`http://localhost:5000/ticket/Etickets/${username}`)
    .then(response => response.json())
    .then(data => {
      renderEventsTickets(data);
    })
    .catch(error => console.error('Error fetching museum tickets:', error));
}


function renderMuseumTickets(museumTickets) {
  const museumTicketList = document.getElementById('museumTicketList');
  museumTicketList.innerHTML = '';

  museumTickets.forEach(ticket => {
    const ticketCard = document.createElement('div');
    ticketCard.classList.add('card');
    ticketCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">Ticket ID: ${ticket.museumTicketId}</h5>
        <p class="card-text"><strong>Museum Name:</strong> ${ticket.museumName}</p>
        <p class="card-text"><strong>Date of Purchase:</strong> ${ticket.purchaseDate}</p>
      </div>
    `;
    museumTicketList.appendChild(ticketCard);
  });
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
                  <h5 class="card-title">Ticket ID: ${ticket.eventTicketId}</h5>
                  <p class="card-text"><strong>Event Name:</strong> ${ticket.eventName}</p>
                  <p class="card-text"><strong>Starting Date:</strong> ${ticket.startDateTime}</p>
                  <p class="card-text"><strong>Ending Date:</strong> ${ticket.endDateTime}</p>
                  <p class="card-text"><strong>Date of Purchase:</strong> ${ticket.purchaseDate}</p>
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
    if (username) {
      fetchMuseumTickets(username);
      fetchEventTickets(username); 
    } else {
      console.error('Unable to decode username from token');
    }
  } else {
    console.error('Token not found in localStorage');
  }
}


document.addEventListener('DOMContentLoaded', fetchTicketsByUserToken);


// Call fetchTicketsByUserToken function when the page loads
//document.addEventListener('DOMContentLoaded', fetchTicketsByUserToken);
