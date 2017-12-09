  /*
    Make this a project to collection the data of the different routes returning home from work.

    Map the data presentable out on google maps or leaflet!
    1. Each dataset will be organized by days.
    2. Use each day dataset to present a map of the route and a graph of altitude, speed, and coordinates
  */

import config from './initialize.js'
import lib from './lib.js'
import auth from './auth.js'
import getDistanceInMeters from './getDistanceInMeters.js'

let app = firebase.initializeApp(config),
  appAuth = app.auth(),
  appDatabase = app.database(),
  doGeolocation = true,
  uploadData = true,
  iter = 0,
  distanceTraveled = 0,
  coords = {
    firstPoint: {
      lat: 0,
      long: 0
    },
    lastPoint: {
      lat: 0,
      long: 0
    }
  },
  id = navigator.geolocation.watchPosition(success, err => console.warn('ERROR(' + err.code + '): ' + err.message), {
    enableHighAccuracy: true
  })

auth(appAuth)

lib.query('#cancel').onclick = e => {
  let target = e.target,
    cancelIcon = target.src

  if (cancelIcon.includes('x-circle.svg')) {
    target.src = './icons/check-circle.svg'
    doGeolocation = false
    navigator.geolocation.clearWatch(id)
  } else if (cancelIcon.includes('check-circle.svg')) {
    target.src = './icons/x-circle.svg'
    doGeolocation = true
    id = navigator.geolocation.watchPosition(success, err => console.warn('ERROR(' + err.code + '): ' + err.message), OPTIONS)
  }
}

lib.query('#upload').onclick = e => {
  let target = e.target,
    cancelIcon = target.src

  if (cancelIcon.includes('cloud.svg')) {
    target.src = './icons/cloud-off.svg'
    uploadData = false
  } else if (cancelIcon.includes('cloud-off.svg')) {
    target.src = './icons/cloud.svg'
    uploadData = true
  }
}

function success(pos) {
  const coords = pos.coords,
    speed = coords.speed ? coords.speed : 0,
    temp = `<p id="speed">${speed.toFixed(0)||0}<p>`,
    user = firebase.auth().currentUser,
    {
      displayName,
      email,
      photoURL,
      uid
    } = user

  let distanceTraveled

  if (user) {
    appDatabase.ref(`users/${uid}`).set({
      displayName, email, photoURL
    })
    lib.query('#signin').src = photoURL
  }

  lib.query('#speedContainer').innerHTML = ''
  lib.query('#speedContainer').innerHTML = temp

  if (iter === 0 && coords.firstPoint) {
    coords.firstPoint.lat = coords.latitude
    coords.firstPoint.long = coords.longitude
    iter++
  } else if (iter > 0 && coords.lastPoint) {
    coords.lastPoint.lat = coords.latitude
    coords.lastPoint.long = coords.longitude

    //make a segment that displays distance distanceTraveled
    distanceTraveled = getDistanceInMeters(coords.firstPoint.lat
                        , coords.firstPoint.long
                        , coords.lastPoint.lat
                        , coords.lastPoint.long)
  }

  if (uploadData && uid) {
    appDatabase.ref(`location/${uid}`).push({
      distanceTraveled: distanceTraveled,
      timestamp: pos.timestamp,
      altitude: coords.altitude,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed
    })
  }
}
