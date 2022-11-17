const input = document.querySelector('#input')
const birthBtn = document.querySelector('#birth')
const deathBtn = document.querySelector('#death')
const newsBtn = document.querySelector('#news')
const notableBtn = document.querySelector('#notable')
let month = ''
let day = ''
const ul = document.querySelector('#ul')



let buttons = document.querySelector('.buttons')

//event listener to trigger today function
buttons.addEventListener('click', today)

//async function today
async function today(e){

  //prevents page from reloading due to 'form' submission
  e.preventDefault()

  //slices pieces of date input for day and month variables
  day = input.value.slice(8,10)
  month = input.value.slice(5,7)
  
  //api call to get data
  const dateApi = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`)
  console.log(dateApi)

  //global variable to use in if statements
  let notables = ''

  //series off if statements to check which button was acyually pressed and adds data to user screen
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

