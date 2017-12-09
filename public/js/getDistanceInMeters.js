function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function getDistanceInMeters(lat1, lon1, lat2, lon2) {

  var R = 6371000,
    dLat = deg2rad(lat2 - lat1),
    dLon = deg2rad(lon2 - lon1),
    dLatSin = Math.sin(dLat / 2) * Math.sin(dLat / 2),
    lat1Cos = Math.cos(deg2rad(lat1)),
    lat2Cos = Math.cos(deg2rad(lat2)),
    dLonSin = Math.sin(dLon / 2) * Math.sin(dLon / 2),
    a = dLatSin + lat1Cos * lat2Cos * dLonSin,
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  var d = R * c // Distance in meters

  return d
}

export default getDistanceInMeters
