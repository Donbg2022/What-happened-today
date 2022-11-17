const input = document.querySelector('#input')
const birthBtn = document.querySelector('#birth')
const deathBtn = document.querySelector('#death')
const newsBtn = document.querySelector('#news')
const notableBtn = document.querySelector('#notable')
let month = ''
let day = ''
const ul = document.querySelector('#ul')



const buttons = document.querySelector('.buttons')

//event listener to trigger today function
buttons.addEventListener('click', today)

//event listener that envokes when page is loaded
const theDate = document.querySelector('#thedate')
window.addEventListener('load', async() =>{

  //get todays date 
const date = new Date();
//takes the month and makes it a string   
const month = date.toLocaleString('default', { month: 'long' });
const monthNumber = date.getMonth()
const dayNumber = date.getDay()
//displays said sting and day 
theDate.innerText = `${month} ${dayNumber}`
  
//calling api to display what has happened today
const todayApi = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${monthNumber}/${dayNumber}`)

let notables = todayApi.data.selected
    for (let i = 0; i < 20; i++) {
    let valList = ul.appendChild(document.createElement('li'))
    valList.innerText = notables[i].text
    }
  })



const title = document.querySelector('#history-today')
const load = document.querySelector('#load')
//async function today
async function today(e){

title.innerText = `${e.target.innerText} in History`

//gets the number of the date so it can be used in axios request
  day = new Date(input.value).getDay()
  month = new Date(input.value)

  //stringifys the month and displays it on user screen
  let monthString = month.toLocaleString('default', { month: 'long' })
  theDate.innerText = `${monthString} ${day}`

  //resets page if a new date request is submitted
  ul.innerText = ''

  //prevents page from reloading due to 'form' submission
  e.preventDefault()


  load.style.display = 'block'
  //api call to get data
  const dateApi = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month.getMonth()}/${day}`)
  load.style.display = 'none'
  //series off if statements to check which button was actually pressed and adds data to user screen
  if (e.target.innerText === 'BIRTHS'){
    let notables = dateApi.data.births
    for (let i = 0; i < 20; i++) {
    let valList = ul.appendChild(document.createElement('li'))
    valList.innerText = notables[i].text
}
  }else if (e.target.innerText === 'DEATHS') {
    let notables = dateApi.data.deaths
    for (let i = 0; i < 20; i++) {
    let valList = ul.appendChild(document.createElement('li'))
    valList.innerText = notables[i].text
  }
}else if (e.target.innerText === 'NEWS EVENTS') {
  let notables = dateApi.data.events
  for (let i = 0; i < 20; i++) {
  let valList = ul.appendChild(document.createElement('li'))
  valList.innerText = notables[i].text
}
}else if(e.target.innerText === 'NOTABLE EVENTS'){
    let notables = dateApi.data.selected
    for (let i = 0; i < 20; i++) {
    let valList = ul.appendChild(document.createElement('li'))
    valList.innerText = notables[i].text
  }
}
}

