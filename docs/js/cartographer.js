function initMap() {

  let options = {
      center: {
        lat: 30.41,
        lng: -97.66
      },
      zoom: 11
    },
    ParmerRiataMap = new google.maps.Map(document.getElementById('ParmerRiataMap'), options),
    ParmerRiataLongMap = new google.maps.Map(document.getElementById('ParmerRiataLongMap'), options)

  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

}
