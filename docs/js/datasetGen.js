import trialRunData from './backup/spedo-trial-run.js'

function generator(name) {

  let iter = 0,
  exporter = []

  for (let value in trialRunData) {

    exporter.push({
      x: (trialRunData[value].timestamp || 0),
      y: (trialRunData[value][name] || 0).toFixed(2)
    })

    iter++
  }

  return exporter
}

export default generator
