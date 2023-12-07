// Function to fetch national park data
async function fetchParks() {
    let response = await fetch("http://localhost:3000/NationalParks");
    let parks = await response.json();
    return parks.map(park => ({
        id: park.id,
        name: park.LocationName,
        state: park.State,
        // other park details...
    }));
}

// Function to display information for a single park
function displayPark(park) {
    const searchResults = document.getElementById('searchResults');
    searchResults.textContent = ''; // Clear existing content

    // Create and append elements for displaying park details
    // Similar to previous implementation but without using innerHTML
    // ...
}

// Function to populate the state dropdown
async function populateStateDropdown(parks) {
    const states = [...new Set(parks.map(park => park.state))];
    const stateDropdown = document.getElementById('stateDropdown');

    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateDropdown.appendChild(option);
    });
}

// Function to populate the type dropdown
function populateTypeDropdown() {
    // Assuming you have a list of types or logic to determine them
    const types = ["Type1", "Type2", "Type3"]; // Example types
    const typeDropdown = document.getElementById('typeDropdown');

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeDropdown.appendChild(option);
    });
}

// Event listener for DOM content loaded and Find Park button click
document.addEventListener("DOMContentLoaded", async () => {
    const parks = await fetchParks();
    populateStateDropdown(parks);
    populateTypeDropdown();

    const findParkButton = document.getElementById('findParkButton');
    findParkButton.addEventListener('click', () => {
        const selectedState = document.getElementById('stateDropdown').value;
        const selectedType = document.getElementById('typeDropdown').value;
        
        // Logic to find the park based on selected state and type
        // For now, just an example to filter by state
        const filteredParks = parks.filter(park => park.state === selectedState);
        if (filteredParks.length > 0) {
            displayPark(filteredParks[0]); // Display the first park in the filtered list
        }
    });
});
