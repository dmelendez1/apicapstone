async function getSunsetForMountain(lat, lng) {
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

function createMountainCard(mt, sunTimes) {
    const li = document.createElement('li');
    li.className = 'trail-card';

    const img = document.createElement('img');
    img.src = `images/${mt.img}`;
    img.alt = mt.name;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';

    const h3 = document.createElement('h3');
    h3.textContent = mt.name;

    const pElevation = document.createElement('p');
    pElevation.textContent = `Elevation: ${mt.elevation} ft`;

    const pEffort = document.createElement('p');
    pEffort.textContent = `Effort: ${mt.effort}`;

    const pDesc = document.createElement('p');
    pDesc.textContent = mt.desc;

    const pSunrise = document.createElement('p');
    pSunrise.textContent = `Sunrise: ${sunTimes.results.sunrise}`;

    const pSunset = document.createElement('p');
    pSunset.textContent = `Sunset: ${sunTimes.results.sunset}`;

    infoDiv.append(h3, pElevation, pEffort, pDesc, pSunrise, pSunset);
    li.append(img, infoDiv);

    return li;
}

async function displayMountain(mountain, clearList = false) {
    const list = document.querySelector('.mt-display-module-list');
    if (clearList) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    const sunTimes = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
    const mountainCard = createMountainCard(mountain, sunTimes);

    list.appendChild(mountainCard);
}

async function displayMountains(mountains) {
    for (const mt of mountains) {
        await displayMountain(mt);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const dropdown = document.getElementById('mountainDropdown');
    const findButton = document.getElementById('findMtButton');

    // Populate the dropdown with mountains
    mountainsArray.forEach(mt => {
        const option = document.createElement('option');
        option.value = mt.name;
        option.textContent = mt.name;
        dropdown.appendChild(option);
    });

    // Display top 6 mountains
    await displayMountains(top6mountainsArray.slice(0, 6));

    // Event listener for find button
    findButton.addEventListener('click', async () => {
        const selectedMountainName = dropdown.value;
        const selectedMountain = mountainsArray.find(mt => mt.name === selectedMountainName);
        if (selectedMountain) {
            await displayMountain(selectedMountain, true);
        }
    });
});
