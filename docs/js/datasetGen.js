function generator(name, data) {

  const secondsThreshold = 5000

  let exporter = [],
    tmp,
    start

  for (let value of Object.values(data)) {

    if (typeof tmp === 'undefined') tmp = value.timestamp
    if (typeof start === 'undefined') start = value.timestamp

    if (value.timestamp - tmp > secondsThreshold) {

      if (value[name] !== 0) {
        exporter.push({
          x: ((value.timestamp || 0) - start) / 1000,
          y: +(value[name] || 0).toFixed(2)
        })
      }
      tmp = value.timestamp
    }

  }

  return exporter
}

export default generator
