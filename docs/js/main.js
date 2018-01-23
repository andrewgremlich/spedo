import datasetGen from './datasetGen.js'
import makeGraph from './makeGraph.js'
import trialRunData from './backup/spedo-trial-run.js'
import parmerThroughRiata1 from './backup/parmerThroughRiata1.js'
import parmerThroughRiata2 from './backup/parmerThroughRiata2.js'
import parmerThroughRiata3 from './backup/parmerThroughRiata3.js'
import parmerThroughRiataLong1 from './backup/ParmerThroughRiataLong.js'
import dispenseStats from './statisticMethods.js'

document.getElementById('remoteRepo').onclick = e => {
  var win = window.open('https://github.com/andrewgremlich/spedo', '_blank')
  win.focus()
}

document.getElementById('refresh').onclick = e => {
  location.reload()
}

let parmerThroughRiata = [parmerThroughRiata1, parmerThroughRiata2, parmerThroughRiata3],
  parmerThroughRiataLong = [ parmerThroughRiataLong1 ]

makeGraph('Trial Run of Spedo App', document.getElementById("trialRunChart").getContext("2d"), trialRunData)
makeGraph('Parmer Through Riata', document.getElementById("ParmerRiata").getContext("2d"), parmerThroughRiata)
makeGraph('Parmer Through Riata Long', document.getElementById("ParmerRiataLong").getContext("2d"), parmerThroughRiataLong)

dispenseStats('Parmer through Riata Run', document.getElementById('ParmerRiataStats'), parmerThroughRiata)
dispenseStats('Parmer through Riata Long Run', document.getElementById('ParmerRiataLongStats'), parmerThroughRiataLong)
