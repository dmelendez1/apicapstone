// Function to fetch all mountain data from the API
function fetchMountains() {
    return fetch("http://localhost:3000/Mountains")
        .then(response => response.json())
        .then(data => data.map(m => ({
            name: m.Name,
            elevation: m.Elevation,
            effort: m.Effort,
            img: m.Img,
            desc: m.Desc,
            coords: {
                lat: m.Coords.Lat,
                lng: m.Coords.Lng
            }
        })));
}

// fetch data for a single mountain
function fetchMountain(mountainName) {
    return fetch(`http://localhost:3000/Mountains?Name=${encodeURIComponent(mountainName)}`)
        .then(response => response.json())
        .then(data => {
            // response is an array and the 1st item is the desired mountain
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
        });
}


// Function to populate the dropdown with mountain names
function populateDropdown(mountains) {
    const dropdown = document.getElementById('mountainDropdown');
    mountains.forEach(mountain => {
        const option = document.createElement('option');
        option.value = mountain.name;
        option.textContent = mountain.name;
        dropdown.appendChild(option);
    });
}

// functiondisplay information for a chosen mountain
function displayMountain(mountain) {
    const displayModuleList = document.querySelector('.mt-display-module-list');
    displayModuleList.textContent = ''; // cclear existing 

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
    descP.textContent = mountain.desc;
    coordsP.textContent = `Coordinates: Lat ${mountain.coords.lat}, Lng ${mountain.coords.lng}`;

    li.appendChild(h2);
    li.appendChild(effortP);
    li.appendChild(img);
    li.appendChild(descP);
    li.appendChild(coordsP);

    displayModuleList.appendChild(li);
}

// DOMloaded and ffind button click
document.addEventListener("DOMContentLoaded", () => {
    fetchMountains().then(mountains => {
        if (mountains) {
            populateDropdown(mountains);
        }
    });

    const findMtButton = document.getElementById('findMtButton');
    findMtButton.addEventListener('click', function() {
        const selectedMountainName = document.getElementById('mountainDropdown').value;
        if (selectedMountainName && selectedMountainName !== 'Mountains') {
            fetchMountain(selectedMountainName).then(selectedMountain => {
                if (selectedMountain) {
                    displayMountain(selectedMountain);
                }
            });
        }
    });
});