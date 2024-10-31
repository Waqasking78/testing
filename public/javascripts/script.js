const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error("error");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "hello world",
}).addTo(map);

const markers = {};

socket.on("receive-location", function (data) {
  const { id, longitude, latitude } = data;
  map.setView([latitude, longitude]);

  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude])
  }else {
    markers[id] = L.marker([latitude, longitude]).addTo(map)
  }
});

socket.emit("user-disconnected", function (id) {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})