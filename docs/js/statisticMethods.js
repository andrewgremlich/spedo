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

}

function eliminateOutliers() {

}

export default {
  findMeanSpeed,
  findMedianSpeed
}
