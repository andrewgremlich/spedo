import datasetGen from './datasetGen.js'
import makeGraph from './makeGraph.js'
import trialRunData from './backup/spedo-trial-run.js'
import parmerThroughRiata1 from './backup/parmerThroughRiata1.js'

document.getElementById('remoteRepo').onclick = e => {
  var win = window.open('https://github.com/andrewgremlich/spedo', '_blank');
  win.focus();
}

makeGraph('Trial Run of Spedo App', document.getElementById("trialRun").getContext("2d"), trialRunData)
makeGraph('Parmer Through Riata', document.getElementById("ParmerRiata").getContext("2d"), parmerThroughRiata1)
