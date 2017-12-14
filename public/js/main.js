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

  lib.query('#download').onclick = e => {

    let user = firebase.auth().currentUser

    fetch(`/fetchUserData/${user.uid}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          })
        }
      })
      .then(data => {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)),
          dlAnchorElem = document.createElement('a')

        dlAnchorElem.setAttribute("href", dataStr)
        dlAnchorElem.setAttribute("download", `${user.displayName}_tracking_data.json`)
        dlAnchorElem.click()
      })
      .catch(error => console.log(error))

  }

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
      id = navigator.geolocation.watchPosition(success, err => console.warn('ERROR(' + err.code + '): ' + err.message), {
        enableHighAccuracy: true
      })
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

    if (user) {
      appDatabase.ref(`users/${uid}`).set({
        displayName,
        email,
        photoURL
      })
      lib.query('#signin').src = photoURL
    }

    lib.query('#speedContainer').innerHTML = ''
    lib.query('#speedContainer').innerHTML = temp

    if (uploadData && uid) {
      appDatabase.ref(`location/${uid}`).push({
        timestamp: pos.timestamp,
        altitude: coords.altitude,
        heading: coords.heading,
        latitude: coords.latitude,
        longitude: coords.longitude,
        speed: coords.speed
      })
    }
  }
