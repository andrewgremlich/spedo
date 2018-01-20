import datasetGen from './datasetGen.js'
import makeGraph from './makeGraph.js'
import trialRunData from './backup/spedo-trial-run.js'
import parmerThroughRiata1 from './backup/parmerThroughRiata1.js'
import parmerThroughRiata2 from './backup/parmerThroughRiata2.js'
import parmerThroughRiata3 from './backup/parmerThroughRiata3.js'
import dispenseStats from './statisticMethods.js'

document.getElementById('remoteRepo').onclick = e => {
  var win = window.open('https://github.com/andrewgremlich/spedo', '_blank')
  win.focus()
}

document.getElementById('refresh').onclick = e => {
  location.reload()
}

let parmerThroughRiata = [parmerThroughRiata1, parmerThroughRiata2, parmerThroughRiata3]

makeGraph('Trial Run of Spedo App', document.getElementById("trialRunChart").getContext("2d"), trialRunData)
makeGraph('Parmer Through Riata', document.getElementById("ParmerRiata").getContext("2d"), parmerThroughRiata)

dispenseStats('Parmer through Riata Run 1', document.getElementById('ParmerRiataStats'), parmerThroughRiata1)
dispenseStats('Parmer through Riata Run 2', document.getElementById('ParmerRiataStats'), parmerThroughRiata2)
dispenseStats('Parmer through Riata Run 2', document.getElementById('ParmerRiataStats'), parmerThroughRiata3)
