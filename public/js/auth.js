import lib from './lib.js'

const provider = new firebase.auth.GoogleAuthProvider()

function main(appAuth) {

  lib.query('#signin').onclick = e => {
    appAuth.signInWithRedirect(provider)
  }

  appAuth.getRedirectResult().then(function(result) {

    let user = {
      name: user.displayName,
      email: user.email,
      uid: user.uid
    }

  }).catch(function(error) {

    const errorCode = error.code,
      errorMessage = error.message,
      email = error.email,
      credential = error.credential

  })
}

export default main
