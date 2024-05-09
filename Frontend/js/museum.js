
// Function to fetch museum data from backend API
function fetchMuseums() {
    // Make a GET request to your backend API endpoint that returns museum data
    fetch('http://localhost:5000/museums/')
        .then(response => response.json())
        .then(data => {
            // Once data is fetched, call a function to render museums
            renderMuseums(data);
        })
        .catch(error => console.error('Error fetching museums:', error));
}

async function Authorize(token) {
    try {
        await jwt.verify(token, "eriksie");
        return true; // Return true if verification succeeds
    } catch (err) {
        return false; // Return false if there's an error (token invalid or expired)
    }
}

// Function to render museums on the page
function renderMuseums(museums) {
    const museumList = document.getElementById('museumList');

    // Clear previous content
    museumList.innerHTML = '';

    // Loop through each museum and create HTML elements
    museums.forEach(museum => {
        const museumCard = document.createElement('div');
        museumCard.classList.add('col-md-6', 'mb-4');
        museumCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${museum.name}</h5>
                    <p class="card-text">${museum.description}</p>
                    <p class="card-text"><strong>Opening Hours:</strong> ${museum.openingHours}</p>
                    <p class="card-text"><strong>Ticket Price:</strong> ${museum.ticketPrice} EGP</p>
                    <a href="#" class="btn btn-primary">Buy Ticket Now</a>
                </div>
            </div>
        `;
        museumList.appendChild(museumCard);
    });
}

// Call fetchMuseums function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchMuseums();
});
