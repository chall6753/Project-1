// date info
let unixDate = new Date() - 1
console.log(unixDate)
let year 
let day 
let month = []

function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp);
  year = a.getFullYear();
  month.push(a.getMonth()+1);
  day = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
timeConverter(unixDate)

if(month.length <2){
  console.log('less than 2')
  month = `0${month}`
}
console.log(day-1
  )

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
setInterval(priceTicker,5000)
function priceTicker(){
  let dropDown = document.getElementById('crypto').value
  fetch(`${urlCoin}/products/${dropDown}/ticker`)
  .then(res => res.json())
  .then(function(json){
      
      document.getElementById('currentPrice').innerText = `$ ${json.price}`
      // console.log(json) delete later
  })
}
//fetches STATS data for whichever crypto is selected in the drop down
const urlCoin = `https://api.pro.coinbase.com`
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
stats()

// top google news articles on selected crypto
const newsUrl = 'http://api.mediastack.com/v1/news?access_key='
const newsApiKey = '03e6b37738146acd68dffe5329b6cc10'
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
news()


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
cryptoImage()


