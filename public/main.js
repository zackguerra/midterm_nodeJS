// main.js
const update1 = document.querySelector('#update-button1')
const update2 = document.querySelector('#update-button2')


update1.addEventListener('click', _ => {    
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader',
        quote: 'You dont know the power of the dark side.'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
        window.location.reload(true)

    })
  })

  update2.addEventListener('click', _ => {    
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Yoda',
        quote: 'Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering.'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
        window.location.reload(true)

    })
  })


const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })