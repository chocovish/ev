var elm = document.getElementById("data");
var map = L.map("map").setView([22.568998335072013, 88.2696913401448], 15);
var car_markers = {};

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  //   tileSize: 512,
  //   zoomOffset: -1,
}).addTo(map);

var ws = new WebSocket("ws://localhost:3000/websocket");
ws.onmessage = (m) => {
  console.log(m);
  elm.innerText = m.data;
  let data = JSON.parse(m.data);
  let [lat, lon] = data.last_location.split(",").map((s) => s.trim());
  if (car_markers[data._id]) {
    car_markers[data._id].setLatLng(L.latLng({ lat, lon }));
  } else {
    car_markers[data._id] = L.marker({ lat, lon });
    car_markers[data._id]
      .bindPopup(`This is the ${data.name}'s location`)
      .addTo(map);
  }
  map.setView([lat,lon],15)
};
