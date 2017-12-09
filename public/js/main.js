import config from './initialize.js'
import lib from './lib.js'

firebase.initializeApp(config)

let doGeolocation = true,
  uploadData = true

lib.query('#cancel').onclick = e => {
  let target = e.target,
    cancelIcon = target.src

  if (cancelIcon.includes('x-circle.svg')) {
    target.src = './icons/check-circle.svg'
    doGeolocation = false
    lib.query('#upload').click()
    navigator.geolocation.clearWatch(id)
  } else if (cancelIcon.includes('check-circle.svg')) {
    target.src = './icons/x-circle.svg'
    doGeolocation = true
    lib.query('#upload').click()
    id = navigator.geolocation.watchPosition(success
                                            , err => console.warn('ERROR(' + err.code + '): ' + err.message)
                                            , OPTIONS)
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

let id,
  database = firebase.database()

const OPTIONS = { enableHighAccuracy: true }

function success(pos) {
  const coords = pos.coords,
    speed = coords.speed ? coords.speed : 0,
    temp = `<p id="speed">${speed.toFixed(0)||0}<p>`

  lib.query('#speedContainer').innerHTML = ''
  lib.query('#speedContainer').innerHTML = temp

  if (uploadData) {
    firebase.database().ref('locationdata/').push({
      timestamp: pos.timestamp,
      altitude: coords.altitude,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed
    })
  }
}

id = navigator.geolocation.watchPosition(success
                                        , err => console.warn('ERROR(' + err.code + '): ' + err.message)
                                        , OPTIONS)
