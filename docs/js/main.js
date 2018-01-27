import datasetGen from './datasetGen.js'
import makeGraph from './makeGraph.js'
import makeMap from './makeMap.js'
import trialRunData1 from './backup/spedo-trial-run.js'
import parmerThroughRiata1 from './backup/parmerThroughRiata1.js'
import parmerThroughRiata2 from './backup/parmerThroughRiata2.js'
import parmerThroughRiata3 from './backup/parmerThroughRiata3.js'
import parmerThroughRiataLong1 from './backup/ParmerThroughRiataLong.js'
import HowardWellsBranch1 from './backup/HowardWellsBranch1.js'
import dispenseStats from './statisticMethods.js'

document.getElementById('remoteRepo').onclick = e => {
  var win = window.open('https://github.com/andrewgremlich/spedo', '_blank')
  win.focus()
}

document.getElementById('refresh').onclick = e => {
  location.reload()
}

let parmerThroughRiata = [parmerThroughRiata1, parmerThroughRiata2, parmerThroughRiata3],
  parmerThroughRiataLong = [parmerThroughRiataLong1],
  HowardWellsBranch = [HowardWellsBranch1],
  trialRunData = [trialRunData1]

makeGraph('Trial Run of Spedo App', document.getElementById("trialRunChart").getContext("2d"), trialRunData)
dispenseStats('Trial Run', document.getElementById('trialRunStats'), trialRunData)
makeMap('[data-map="trialRunMap"]', trialRunData1)

makeGraph('Parmer Through Riata', document.getElementById("ParmerRiata").getContext("2d"), parmerThroughRiata)
dispenseStats('Parmer through Riata Run', document.getElementById('ParmerRiataStats'), parmerThroughRiata)
makeMap('[data-map="ParmerRiataMap"]', parmerThroughRiata1)

makeGraph('Parmer Through Riata Long', document.getElementById("ParmerRiataLong").getContext("2d"), parmerThroughRiataLong)
dispenseStats('Parmer through Riata Long Run', document.getElementById('ParmerRiataLongStats'), parmerThroughRiataLong)
makeMap('[data-map="ParmerRiataLongMap"]', parmerThroughRiataLong1)

makeGraph('Howard - Wells Branch - Howard', document.getElementById("HowardWellsBranch").getContext("2d"), HowardWellsBranch)
dispenseStats('Howard - Wells Branch - Howard', document.getElementById('HowardWellsBranchStats'), HowardWellsBranch)
makeMap('[data-map="HowardWellsBranchMap"]', HowardWellsBranch1)
