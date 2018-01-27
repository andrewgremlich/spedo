
const BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap?center=30.4244571,-97.7126388',
  ZOOM_AND_SIZE = '&zoom=12&size=600x400',
  MAP_KEY = '&key=AIzaSyBE-tt-Ua7Ku6suYFSc0pCLRtSZ11e76Tc',
  BASE_PATH = '&path=color:0x0000ff80|weight:3'

function makeMarkers(dataset) {

  let datasetKeys = Object.keys(dataset),
    firstMarker = dataset[datasetKeys[0]],
    lastMarker = dataset[datasetKeys[datasetKeys.length - 1]]

  return `&markers=color:green|${firstMarker.latitude},${firstMarker.longitude}&markers=color:red|${lastMarker.latitude},${lastMarker.longitude}`
}

function makePath(dataset) {

  let datasetKeys = Object.keys(dataset),
    path = ''

  for (let i = 0; i < datasetKeys.length; i += 60) {
    path += `|${dataset[datasetKeys[i]].latitude},${dataset[datasetKeys[i]].longitude}`
  }

  return path
}

function main(query, dataset) {
  document.querySelector(query).src = BASE_URL + ZOOM_AND_SIZE + makeMarkers(dataset) + BASE_PATH + makePath(dataset) + MAP_KEY
}

export default main
