import datasetGen from './datasetGen.js'
import makeGraph from './makeGraph.js'
import trialRunData from './backup/spedo-trial-run.js'
import parmerThroughRiata1 from './backup/parmerThroughRiata1.js'
import parmerThroughRiata2 from './backup/parmerThroughRiata2.js'

document.getElementById('remoteRepo').onclick = e => {
  var win = window.open('https://github.com/andrewgremlich/spedo', '_blank');
  win.focus();
}

let parmerThroughRiata = [parmerThroughRiata1, parmerThroughRiata2]

makeGraph('Trial Run of Spedo App', document.getElementById("trialRun").getContext("2d"), trialRunData)
makeGraph('Parmer Through Riata', document.getElementById("ParmerRiata").getContext("2d"), parmerThroughRiata)
