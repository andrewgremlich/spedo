import trialRunData from './backup/spedo-trial-run.js'

function generator(name) {

  const secondsThreshold = 5000

  let exporter = [],
    tmp

  for (let value of Object.values(trialRunData)) {

    if (tmp === undefined) tmp = value.timestamp

    if (value.timestamp - tmp > secondsThreshold) {
      exporter.push({
        x: (value.timestamp || 0),
        y: +(value[name] || 0).toFixed(2)
      })
      tmp = value.timestamp
    }

  }

  console.log(exporter)
  return exporter
}

export default generator
