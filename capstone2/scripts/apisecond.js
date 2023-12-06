// func=>to fetch all mountain data from the API
async function fetchMountains() {
    let response = await fetch("http://localhost:3000/Mountains");
    let data = await response.json();
    return data.map(m => ({
        name: m.Name,
        elevation: m.Elevation,
        effort: m.Effort,
        img: m.Img,
        desc: m.Desc,
        coords: {
            lat: m.Coords.Lat,
            lng: m.Coords.Lng
        }
    }));
}

// => to fetch data for a single mountain
async function fetchMountain(mountainName) {
    let response = await fetch(`http://localhost:3000/Mountains?Name=${encodeURIComponent(mountainName)}`);
    let data = await response.json();
    const mountain = data[0];
    return {
        name: mountain.Name,
        elevation: mountain.Elevation,
        effort: mountain.Effort,
        img: mountain.Img,
        desc: mountain.Desc,
        coords: {
            lat: mountain.Coords.Lat,
            lng: mountain.Coords.Lng
        }
    };
}



// Function to display information for a chosen mountain
function displayMountain(mountain) {
    const displayModuleList = document.querySelector('.mt-display-module-list');
    displayModuleList.textContent = ''; // Clear content

    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const effortP = document.createElement('p');
    const img = document.createElement('img');
    const descP = document.createElement('p');
    const coordsP = document.createElement('p');

    h2.textContent = `${mountain.name} (${mountain.elevation} feet)`;
    effortP.textContent = `Effort: ${mountain.effort}`;
    img.src = mountain.img;
    img.alt = `Image of ${mountain.name}`;
    descP.textContent = `Description: ${mountain.desc}`;
    coordsP.textContent = `Coordinates: Lat ${mountain.coords.lat}, Lng ${mountain.coords.lng}`;

    li.appendChild(h2);
    li.appendChild(effortP);
    li.appendChild(img);
    li.appendChild(descP);
    li.appendChild(coordsP);

    displayModuleList.appendChild(li);
}


// => populate the dropdown w mountain names
async function populateDropdown() {
    const mountains = await fetchMountains();
    const dropdown = document.getElementById('mountainDropdown');
    mountains.forEach(mountain => {
        const option = document.createElement('option');
        option.value = mountain.name;
        option.textContent = mountain.name;
        dropdown.appendChild(option);
    });
}

// DOM content loaded &* find button click
document.addEventListener("DOMContentLoaded", async () => {
    await populateDropdown();

    const findMtButton = document.getElementById('findMtButton');
    findMtButton.addEventListener('click', async () => {
        const selectedMountainName = document.getElementById('mountainDropdown').value;
        if (selectedMountainName && selectedMountainName !== 'Mountains') {
            const selectedMountain = await fetchMountain(selectedMountainName);
            if (selectedMountain) {
                displayMountain(selectedMountain);
            }
        }
    });
});
