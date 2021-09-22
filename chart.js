//fetches stats data for whichever crypto is selected in the drop down
let newArr = []
let labels =[]
function candles(){
    let dropDown = document.getElementById('crypto').value
    
    fetch(`${urlCoin}/products/${dropDown}/candles?start=${year}-${month}-${day-7}&end=${year}-${month}-${day}&granularity=86400`)
    .then(res => res.json())
    .then(function(json){
       json.forEach(arr => {
           newArr.unshift(arr[5])
           
       });
        console.log(newArr)
        console.log(json)
    }) 
}
// clears chart so canvas can be reused
function clearChart(){
    if(myChart != undefined){
        myChart.destroy()  
        newArr =[]  
    }
    
}

//creates labels array with the correct dates of the last 7days
for (let i = day; i > day-7; i--) {
    labels.unshift(i)
    console.log(labels)
}

let myChart

function chartCreate(){
src="https://cdn.jsdelivr.net/npm/chart.js"
let ctx = document.getElementById('volumeChart').getContext('2d');
ctx.canvas.width = ctx.canvas.originalwidth;
ctx.canvas.height = ctx.canvas.originalheight;
myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Daily Volume - Past 7 Days',
            data: newArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation:{duration:100}
        
    }
});
    setInterval(() => {myChart.update()}, 10);
}


candles()
chartCreate()
