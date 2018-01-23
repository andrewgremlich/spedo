function findMeanSpeed(dataset) {

  let speedsSum = 0,
    datapointAmount = Object.keys(dataset).length

  for (let value in dataset) {

    let speedPoint = dataset[value].speed

    if (speedPoint) {
      speedsSum += speedPoint
    }
  }

  return (speedsSum / datapointAmount).toFixed(2)
}

function findMedianSpeed(dataset) {

  let speedsArrayToSort = []

  for (let value in dataset) {

    let speedPoint = dataset[value].speed

    if (speedPoint) {
      speedsArrayToSort.push(speedPoint)
    }
  }

  let sorted = speedsArrayToSort.sort((a, b) => {
      return a - b
    }),
    middle = Math.floor((sorted.length - 1) / 2),
    median

  if (sorted.length % 2) {
    median = sorted[middle].toFixed(2)
  } else {
    median = ((sorted[middle] + sorted[middle + 1]) / 2.0).toFixed(2)
  }

  return median
}

function milliSecsToMin(duration) {

  let seconds = duration / 1000,
    min = seconds / 60

  return min.toFixed(2)
}

function lengthOfTrip(dataset) {
  const objKeys = Object.keys(dataset),
    duration = (dataset[objKeys[objKeys.length - 1]].timestamp) - (dataset[objKeys[0]].timestamp),
    minutes = milliSecsToMin(duration)

  return minutes
}

function howManyTimesStopped() {
  console.log('nothing done yet.')
}

function eliminateOutliers() {
  console.log('nothing done yet.')
}

function outputStats(header, dispenser, datasets) {

  if (Array.isArray(datasets)) {

    let iter = 0

    for (let dataset of datasets) {

      iter++

      let statDiv = document.createElement('div'),
        h1header = document.createElement('h4'),
        h3mean = document.createElement('h5'),
        h3median = document.createElement('h5'),
        h3time = document.createElement('h5'),
        mean = findMeanSpeed(dataset),
        median = findMedianSpeed(dataset),
        timeDuration = lengthOfTrip(dataset)

      h1header.appendChild(document.createTextNode(`${header} ${iter}`))

      h3mean.appendChild(document.createTextNode(`Mean: ${mean} m/s`))
      h3median.appendChild(document.createTextNode(`Median: ${median} m/s`))
      h3time.appendChild(document.createTextNode(`Time Duration: ${timeDuration} min`))

      statDiv.appendChild(h1header)
      statDiv.appendChild(h3mean)
      statDiv.appendChild(h3median)
      statDiv.appendChild(h3time)

      dispenser.appendChild(statDiv)
    }

  } else {
    console.warn('Not an array!!!')
  }
}

export default outputStats
