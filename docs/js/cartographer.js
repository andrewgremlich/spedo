
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('ParmerRiataMap'), {
    center: {
      lat: 30.41,
      lng: -97.66
    },
    zoom: 12
  });
}
