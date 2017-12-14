const functions = require('firebase-functions'),
  admin = require('firebase-admin'),
  express = require('express'),
  app = express()

admin.initializeApp(functions.config().firebase)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/helloWorld', (req, res) => {
  res.send('helloWorld')
})

app.get('/fetchUserData/:id', (req,res) =>{
  res.setHeader('Content-Type', 'application/json');

  let id = req.params.id

  admin.database().ref(`/location/${id}`).once('value').then(snap => {
    const val = snap.val()
    res.send(JSON.stringify(val))
    admin.database().ref(`/location/${id}`).set(null)
  })
})

exports.api = functions.https.onRequest(app);
