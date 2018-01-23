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

}
