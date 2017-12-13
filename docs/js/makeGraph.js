import datasetGen from './datasetGen.js'

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
    }
  }

  let data = {
      datasets: [{
        label: 'Speed (m/s)',
        data: datasetGen('speed', dataset),
        borderWidth: 1,
        backgroundColor: 'rgba(221, 181, 93, 0.67)'
      }]
    }

  var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })
}

export default main
