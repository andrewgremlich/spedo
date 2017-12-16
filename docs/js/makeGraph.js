import datasetGen from './datasetGen.js'

function getRandomColor() {
  const letters = '0123456789ABCDEF'

  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function main(graphTitle, ctx, dataset) {
  const options = {
    showLines: true,
    title: {
      display: true,
      text: graphTitle
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Elapsed Time (s)'
        }
      }],
      yAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Speed (m/s)'
        }
      }]
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
      }
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    animation: {
      duration: 0
    }
  }

  let data = {
    datasets: []
  }

  if (Array.isArray(dataset)) {

    let iter = 1

    for (let set of dataset) {

      let color = getRandomColor()

      data.datasets.push({
        label: `Run ${iter} (m/s)`,
        data: datasetGen('speed', set),
        borderWidth: 1,
        backgroundColor: color,
        borderColor: color,
        fill: false
      })
      iter++
    }
  } else {

    let color = getRandomColor()
    data.datasets.push({
      label: 'Speed (m/s)',
      data: datasetGen('speed', dataset),
      borderWidth: 1,
      backgroundColor: color,
      borderColor: color,
      fill: false
    })
  }

  var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })
}

export default main
