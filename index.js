
const newsUrl = 'http://api.mediastack.com/v1/news?access_key='
const urlCoin = `https://api.pro.coinbase.com`
const newsApiKey = '03e6b37738146acd68dffe5329b6cc10'
// date info
let month = []
let startMonth = []
let date = new Date();
let startDate = new Date(date - 604800000) //minus 7 days
let year = date.getFullYear()
let startYear = startDate.getFullYear()
month.push(date.getMonth()+1)
startMonth.push(startDate.getMonth()+1)
let day = date.getDate()
let startDay = startDate.getDate()
// add a zero to months with one digit to make sure api fetch is in correct format
if(month[0] < 10){
  month = `0${month}`
}
if(startMonth[0] <10){
  startMonth = `0${startMonth}`
}

document.addEventListener('DOMContentLoaded',()=>{
  stats()
  news()
  cryptoImage()
  priceTicker()
  candles()
  chartCreate()
})


document.getElementById('priceSubmit').addEventListener('click',priceAlert)

// Event listeners for drop downchanges 
document.getElementById('crypto').addEventListener('change',function(){
  stats()
  news()
  cryptoImage()
  clearChart()
  candles()
  chartCreate()
  priceTicker()
}) 

// fetches price data every 10 seconds
let currentPrice = 'price'
setInterval(priceTicker,5000)
  function priceTicker(){
    let dropDown = document.getElementById('crypto').value
    fetch(`${urlCoin}/products/${dropDown}/ticker`)
    .then(res => res.json())
    .then(function(json){
        document.getElementById('currentPrice').innerText = `$ ${json.price}`
        currentPrice = json.price
  })
}
//fetches STATS data for whichever crypto is selected in the drop down
function stats(){
    let dropDown = document.getElementById('crypto').value
    fetch(`${urlCoin}/products/${dropDown}/stats`)
    .then(res => res.json())
    .then(function(json){
        let objStats = json
        document.getElementById('openPrice').innerText = objStats.open
        document.getElementById('highPrice').innerText = objStats.high
        document.getElementById('lowPrice').innerText = objStats.low
        document.getElementById('volume').innerText = parseFloat(objStats.volume).toFixed(0)
        document.getElementById('volume30Day').innerText = parseFloat(objStats.volume_30day).toFixed(0)
    })
}
// top google news articles on selected crypto
function news(){
  let dropDown = document.getElementById('crypto').value
  
  fetch(`${newsUrl}${newsApiKey}&keywords=${dropDown}&languages=en&date=${year}-${month}-${day}`)
  .then(res => res.json())
  .then(function(json){
    let arr = json.data
    let top5NewsArticles = arr.slice(0,5)
    let i=0
    top5NewsArticles.forEach(article => {
          document.getElementById(`news${i}`).innerText = top5NewsArticles[i].title
      document.getElementById(`news${i}`).href = top5NewsArticles[i].url
      i+=1
    });
  })
}
// changes pic near dropdown list
function cryptoImage(){
  let btcPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png'
  let ethPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/220px-Ethereum-icon-purple.svg.png'
  let adaPic = 'https://s3.cointelegraph.com/storage/uploads/view/a7872fcc56858227ffa183256a5d55e1.png'
  let dropDown = document.getElementById('crypto').value
  if (dropDown === 'BTC-USD') {
    document.getElementById('cryptoImage').src = btcPic
  }else if(dropDown ==='ETH-USD'){
    document.getElementById('cryptoImage').src = ethPic
  }else if(dropDown === 'ADA-USD'){
    document.getElementById('cryptoImage').src = adaPic
  }
}


// price alert
function priceAlert(event){
  let minPrice = document.getElementById('minPrice').value
  let maxPrice = document.getElementById('maxPrice').value
  if(minPrice >= maxPrice){
    window.alert('Min Price cannot be equal to or greater than Max Price')
    document.getElementById('maxPrice').value = ''  
    document.getElementById('myPopup').style.visibility='hidden'
  }else{
    let priceCheck = setInterval( () =>{ 
    document.getElementById('priceSubmit').addEventListener('click',()=> clearInterval(priceCheck))
    if(minPrice >= maxPrice && maxPrice !== ''){
      window.alert('Min Price cannot be equal to or greater than Max Price')
      document.getElementById('maxPrice').value = ''
      clearInterval(priceCheck)
    }
    if (parseFloat(currentPrice) > parseFloat(maxPrice) && maxPrice !== '') {
      console.log(maxPrice)
      console.log('max price alert')
      document.getElementById('myPopup').style.visibility='visible'
      document.getElementById('myPopup').innerText = 'Max Price Limit Reached'
    }else if(parseFloat(currentPrice) < parseFloat(minPrice) && minPrice !== ''){
      console.log('min price alert')
      document.getElementById('myPopup').style.visibility='visible'
      document.getElementById('myPopup').innerText = 'Minimum Price Limit Reached'
    }else{
      console.log('else')
      document.getElementById('myPopup').style.visibility='hidden'
    }
    
  }, 2000 )
  }
  
  
     event.preventDefault() 
    
}

  