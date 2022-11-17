const input = document.querySelector('#input')
const birthBtn = document.querySelector('#birth')
const deathBtn = document.querySelector('#death')
const newsBtn = document.querySelector('#news')
const notableBtn = document.querySelector('#notable')
let month = ''
let day = ''
const ul = document.querySelector('#ul')

//async function used on birth button to display birthdays on date picked
async function birthDay(e){
  //prevents page from reloading when form button is pressed
  e.preventDefault()
  //slicing the date to get month and day from the string respectedly
  day = input.value.slice(8,10)
  month = input.value.slice(5,7)
  //api call using template literals and axios
  const dateApi = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`)
  
  
  let notedBirths = dateApi.data.births
  for (let i = 0; i < 20; i++) {
    let birthList = ul.appendChild(document.createElement('li'))
    birthList.innerText = notedBirths[i].text
  }
}


birthBtn.addEventListener('click', birthDay)


console.log(ul)