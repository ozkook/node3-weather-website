// Im fetching data from the following URL and and then running the callback function - with response as it only argument(response holds the data from the URL and after that it parses the data from json to an object) 
// json() is parsing the data from json to an object.

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (event) => {
    
    event.preventDefault() // event.preventDefault() prevents the default behavior, which is to refresh the browser. without it Ill see the results only for a mil of a second  
    
    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = '' 

    fetch(`http://localhost:30002/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})