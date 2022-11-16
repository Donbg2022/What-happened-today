async function thisDay(){
  const day = await axios.get(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/05/25`)
  console.log(day)
}

thisDay()