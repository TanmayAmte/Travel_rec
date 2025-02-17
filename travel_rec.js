document.getElementById('search_button').addEventListener('click', function () {
    const query = document.getElementById('search_input').value.toLowerCase().trim();
    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    fetch('./travel_rec_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            
            // Search in countries and their cities
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(query)) {
                        results.push(city);
                    }
                });
            });
            
            // Search in temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(query)) {
                    results.push(temple);
                }
            });

            // Search in beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(query)) {
                    results.push(beach);
                }
            });

            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div><img src="./images/no-results.png"></div>';
        return;
    }

    results.forEach(place => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}" onerror="this.src='./images/placeholder.png';">
            <h3 style="color: white;">${place.name}</h3>
            <p style="color: white;">${place.description}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}
