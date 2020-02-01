const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    messageTwo.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location) ).then((response) =>{
    response.json().then((data)=>{

        //Empty loading string
        messageTwo.textContent = ''

        if(data.error){
            messageOne.textContent = data.error
        }
        messageTwo.textContent = data.location + '. Weather Summary: ' + data.forecastData.summary
    })
  })
})