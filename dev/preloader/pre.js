'use strict'
// document.getElementById('body').style.display = "none"
let callback = function() {
  function getAutoCompleteMenu() {
    document.getElementById('preLoader').style.display = 'none'
    document.getElementById('body').style.overflow = 'auto'
  }

  setTimeout(() => {
    getAutoCompleteMenu()
  }, 1000)
}

if ("complete" !== document.readyState && ("loading" === document.readyState || document.documentElement.doScroll)) {
  document.addEventListener("DOMContentLoaded", callback)
} else {
  callback()
}
