function getRandomInRange(a, b, d) {
    var n = Math.random() * (b - a) + a;
    return Number(n.toFixed(d));
}
function fetchAndDisplayLocality(infoDiv, lat, lon) {
    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=en')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var span = infoDiv.querySelector('.locality');
            span.textContent = data.locality || data.city || data.countryName || 'Unknown';
        });
}
function createMap() {
    var map = L.map('map').setView([32.5, -95], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'OpenStreetMap'
    }).addTo(map);

    let count = 1;
    while (count < 4) {
        let lat = getRandomInRange(30, 35, 3);
        let lon = getRandomInRange(-100, -90, 3);

        var m = L.marker([lat, lon]).addTo(map);
        var infoDiv = document.createElement('div');
        infoDiv.className = 'marker-info';
        infoDiv.innerHTML = '<h3>Marker ' + count + '</h3>' +
            '<p>Coordinates: ' + lat + ', ' + lon + '</p>' +
            '<p>Locality: <span class="locality">Loading...</span></p>';
        document.getElementById('markers').appendChild(infoDiv);
        fetchAndDisplayLocality(infoDiv, lat, lon);
        count = count + 1;
    }
}
window.onload = createMap;
