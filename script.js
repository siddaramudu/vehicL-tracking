const map = L.map("map").setView([40.712776, -74.005974], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

const vehicleIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png", // Change with a custom vehicle icon
  iconSize: [50, 50],
});

let marker = L.marker([40.712776, -74.005974], { icon: vehicleIcon }).addTo(
  map
);
let polyline = L.polyline([]).addTo(map);

async function fetchLocation() {
  const res = await fetch("http://localhost:5000/location");
  const location = await res.json();
  marker.setLatLng(location);
  polyline.addLatLng(location);
  map.panTo(location);
}

async function drawRoute() {
  const res = await fetch("http://localhost:5000/route");
  const route = await res.json();
  L.polyline(route, { color: "blue" }).addTo(map);
}

drawRoute();
setInterval(fetchLocation, 3000);
