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
    showLines: false,
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
      }]
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
      }
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
      data.datasets.push({
        label: 'Speed (m/s)',
        data: datasetGen('speed', set),
        borderWidth: 1,
        backgroundColor: getRandomColor()
      })
      iter++
    }
  } else {
    data.datasets.push({
      label: 'Speed (m/s)',
      data: datasetGen('speed', dataset),
      borderWidth: 1,
      backgroundColor: getRandomColor()
    })
  }

  var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })
}

export default main
