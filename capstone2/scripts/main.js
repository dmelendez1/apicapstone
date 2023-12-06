
// Add event listener for DOMContentLoaded to call initial setup functions
document.addEventListener("DOMContentLoaded", () => { 
    populateLocationDropdown();  // Populate location dropdown with options
    populateTypeDropdown();      // Populate park type dropdown with options
    displayTop10Parks();         // Display the top 10 parks
});

// Function to populate the location dropdown
function populateLocationDropdown() {
    const locationDropdown = document.getElementById('locationDropdown');
    locationDropdown.onchange = handleLocationChange; // Set onchange handler
    addOption(locationDropdown, "Location", true, true); // Add default placeholder option
    addOption(locationDropdown, "All", false, false);   // Add 'All' option
    locationsArray.forEach(location => {
        addOption(locationDropdown, location, false, false); // Add each location to dropdown
    });
}

// Function to populate the park type dropdown
function populateTypeDropdown() {
    const typeDropdown = document.getElementById('typeDropdown');
    typeDropdown.onchange = handleTypeChange; // Set onchange handler
    addOption(typeDropdown, "Park Type", true, true); // Add default placeholder option
    addOption(typeDropdown, "All", false, false);     // Add 'All' option
    parkTypesArray.forEach(type => {
        addOption(typeDropdown, type, false, false); // Add each park type to dropdown
    });
}

// Function to display the top 10 parks
function displayTop10Parks() {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.textContent = ''; // Clear any previous results

    top10ParksArray.forEach(park => {
        appendParkDetails(resultsDiv, park); // Append details of each park
    });
}

// Helper function to add options to a dropdown
function addOption(dropdown, text, isPlaceholder, isSelected) {
    const option = document.createElement('option');
    option.textContent = text;
    option.value = text;
    if (isPlaceholder) option.disabled = true; // Disable option if it a placeholder
    if (isSelected) option.selected = true;    // Set option as selected if required
    dropdown.appendChild(option);
}

// Placeholder function for handling location change
function handleLocationChange() {
    // Functionality to be added for handling location dropdown change
}

// Placeholder function for handling park type change
function handleTypeChange() {
    // Functionality to be added for handling park type dropdown change
}

// Add event listener to the 'find park' button
document.getElementById('findParkButton').addEventListener('click', () => {
    const selectedLocation = document.getElementById('locationDropdown').value;
    const selectedType = document.getElementById('typeDropdown').value;
    displayParks(selectedLocation, selectedType); // Display parks based on selected filters
});

// Function to display parks based on selected location and type
function displayParks(selectedLocation, selectedType) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.textContent = ''; // Clear any previous results

    // Filter parks based on selected location and type
    const filteredParks = nationalParksArray.filter(park => 
        (selectedLocation === 'All' || park.State === selectedLocation) &&
        (selectedType === 'All' || park.LocationName.toLowerCase().includes(selectedType.toLowerCase()))
    );

    // Display message if no parks are found
    if (filteredParks.length === 0) {
        resultsDiv.textContent = 'No parks found';
        return;
    }

    // Append details of each filtered park
    filteredParks.forEach(park => {
        appendParkDetails(resultsDiv, park);
    });
}

// Function to append park details to a container
function appendParkDetails(container, park) {
    const parkDiv = document.createElement('div');

    // Create and append park name heading
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = park.LocationName;
    parkDiv.appendChild(nameHeading);

    // Create and append park address
    const addressParagraph = document.createElement('p');
    addressParagraph.textContent = `${park.Address}, ${park.City}, ${park.State}`;
    parkDiv.appendChild(addressParagraph);

    // Add visit link if available
    if (park.Visit) {
        const visitLink = document.createElement('a');
        visitLink.href = park.Visit;
        visitLink.textContent = 'Visit National Parks Website';
        visitLink.target = '_blank'; // Opens link in a new tab
        parkDiv.appendChild(visitLink);
    }

    // Append the park div to the container
    container.appendChild(parkDiv);
}
