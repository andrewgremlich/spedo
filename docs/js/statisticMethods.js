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

function dater(dataset) {
  const objKeys = Object.keys(dataset),
    firstEntry = dataset[objKeys[0]].timestamp,
    date = new Date(firstEntry)

  return date
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
        h5mean = document.createElement('h5'),
        h5median = document.createElement('h5'),
        h5time = document.createElement('h5'),
        h5date = document.createElement('h5'),
        mean = findMeanSpeed(dataset),
        median = findMedianSpeed(dataset),
        timeDuration = lengthOfTrip(dataset),
        date = dater(dataset)

      h1header.appendChild(document.createTextNode(`${header} ${iter}`))

      h5mean.appendChild(document.createTextNode(`Mean: ${mean} m/s`))
      h5median.appendChild(document.createTextNode(`Median: ${median} m/s`))
      h5time.appendChild(document.createTextNode(`Time Duration: ${timeDuration} min`))
      h5date.appendChild(document.createTextNode(`Start time: ${date}`))

      statDiv.appendChild(h1header)
      statDiv.appendChild(h5mean)
      statDiv.appendChild(h5median)
      statDiv.appendChild(h5time)
      statDiv.appendChild(h5date)

      dispenser.appendChild(statDiv)
    }

  } else {
    console.warn('Not an array!!!')
  }
}

export default outputStats
