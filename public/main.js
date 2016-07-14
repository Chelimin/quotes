var update = document.getElementById('update')

update.addEventListener('click', function () {
  console.log('hello')
  // Send PUT Request here
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'}, //HTTP HEadersto send to the server. It is an object with multiple key-value pairs
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    }) //content sent to the server
  })
  .then(response => {
    if (response.ok) return response.json()
    window.location.reload()
  })
  .then(data => {
    console.log(data)
  })
})

var del = document.getElementById('delete')

del.addEventListener('click', function () {
    console.log('bye')
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth'
    })
  }).then(function (response) {
    window.location.reload()
  })
})
