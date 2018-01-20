function findMeanSpeed(dataset) {

  let speedsSum = 0,
    datapointAmount = Object.keys(dataset).length

  for (let value in dataset) {

    let speedPoint = dataset[value].speed

    if (speedPoint) {
      speedsSum += speedPoint
    }
  }

  return (speedsSum / datapointAmount).toFixed(2) + ' m/s'
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

  return median + ' m/s'
}

function howManyTimesStopped() {
  console.log('nothing done yet.')
}

function eliminateOutliers() {
  console.log('nothing done yet.')
}

function outputStats(header, dispenser, dataset) {
  let statDiv = document.createElement('div'),
    h1header = document.createElement('h2'),
    h3mean = document.createElement('h3'),
    h3median = document.createElement('h3'),
    mean = findMeanSpeed(dataset),
    median = findMedianSpeed(dataset)

  h1header.appendChild(document.createTextNode(header))

  h3mean.appendChild(document.createTextNode(`Mean: ${mean} m/s`))
  h3median.appendChild(document.createTextNode(`Median: ${median} m/s`))

  statDiv.appendChild(h1header)
  statDiv.appendChild(h3mean)
  statDiv.appendChild(h3median)

  dispenser.appendChild(statDiv)
}

export default outputStats
