import datasetGen from './datasetGen.js'

document.getElementById('remoteRepo').onclick = e => {
  var win = window.open('https://github.com/andrewgremlich/spedo', '_blank');
  win.focus();
}

const options = {
  showLines: false,
  title: {
    display: true,
    text: 'Trial Run of Spedo App'
  },
  scales: {
    xAxes: [{
      type: 'linear',
      position: 'bottom',
      scaleLabel: {
        display: true,
        labelString: 'Unix Timestamp'
      }
    }]
  },
  elements: {
    line: {
      tension: 0, // disables bezier curves
    }
  }
}

let ctx = document.getElementById("myChart").getContext("2d"),
  data = {
    datasets: [{
      label: 'Speed (m/s)',
      data: datasetGen('speed'),
      borderWidth: 1,
      backgroundColor: 'rgba(221, 181, 93, 0.67)'
    }, {
      label: 'Altitude (m)',
      data: datasetGen('altitude'),
      borderWidth: 1,
      backgroundColor: 'rgba(171, 86, 71, 0.75)'
    }]
  }

var myChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
})
