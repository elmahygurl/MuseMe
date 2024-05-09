// Function to fetch event data from backend API
function fetchEvents() {
  // Make a GET request to your backend API endpoint that returns event data
  fetch('http://localhost:5000/events/')
      .then(response => response.json())
      .then(data => {
          // Once data is fetched, call a function to render events
          renderEvents(data);
      })
      .catch(error => console.error('Error fetching event:', error));
}

// Function to render events on the page
function renderEvents(eventData) {
  const eventList = document.getElementById('eventList');

  // Clear previous content
  eventList.innerHTML = '';

  // Loop through each event and create HTML elements
  eventData.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('col-md-6', 'mb-4');
      eventCard.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
                  <p class="card-text"><strong>From:</strong> ${event.startDateTime}</p>
                  <p class="card-text"><strong>To:</strong> ${event.endDateTime}</p>
                  <p class="card-text"><strong>Ticket Price:</strong> ${event.ticketPrice} EGP</p>
                  <a href="#" class="btn btn-primary">Buy Ticket Now</a>
              </div>
          </div>
      `;
      eventList.appendChild(eventCard);
  });
}

// Call fetchEvents function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchEvents();
});
