function register() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      .then(function(reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker.state === 'activated') {
            document.getElementById('update').style.display = "block"
            document.querySelector('#update').onclick = e => {
              location.reload(true)
            }
          }
        })

      }).catch(function(error) {
        console.log('Registration failed with ' + error);
      })
  }
}
export default register
