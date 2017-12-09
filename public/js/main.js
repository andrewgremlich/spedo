import config from './initialize.js'
import lib from './lib.js'

firebase.initializeApp(config)

lib.query('#cancel')
lib.query('#upload')

let id,
  database = firebase.database()

const OPTIONS = { enableHighAccuracy: true }

function success(pos) {
  const coords = pos.coords,
    speed = coords.speed ? coords.speed : 0,
    temp = `<p id="speed">${speed.toFixed(0)||0}<p>`

  lib.query('#speedContainer').innerHTML = ''
  lib.query('#speedContainer').innerHTML = temp

  console.log(coords, pos.timestamp)

  // firebase.database().ref('locationdata/').push({
  //   timestamp: pos.timestamp,
  //   altitude: coords.altitude,
  //   heading: coords.heading,
  //   latitude: coords.latitude,
  //   longitude: coords.longitude,
  //   speed: coords.speed
  // })

  // Stop watch geolocation watch
  // navigator.geolocation.clearWatch(id)
}

id = navigator.geolocation.watchPosition(success
                                        , err => console.warn('ERROR(' + err.code + '): ' + err.message)
                                        , OPTIONS)
