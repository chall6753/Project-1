//fetches stats data for whichever crypto is selected in the drop down
let volumeDataArr = []
let chartLables = []
// retrieves volume data and creates an array for chart data and labels
function candles(){
    let dropDown = document.getElementById('crypto').value
    chartLables = []
    fetch(`${urlCoin}/products/${dropDown}/candles?start=${startYear}-${startMonth}-${startDay}&end=${year}-${month}-${day}&granularity=86400`)
    .then(res => res.json())
    .then(function(json){
        json.forEach(arr => {
            volumeDataArr.unshift(arr[5])
            chartLables.unshift(`${new Date(arr[0]*1000).getMonth()+1}/${new Date(arr[0]*1000).getDate()}`)
        });
    })  
}
// clears chart so canvas can be reused
function clearChart(){
    if(myChart != undefined){
        myChart.destroy()  
        volumeDataArr =[]  
    }   
}
// creates chart
let myChart
function chartCreate(){
    src="https://cdn.jsdelivr.net/npm/chart.js"
    let ctx = document.getElementById('volumeChart').getContext('2d');
    ctx.canvas.width = ctx.canvas.originalwidth;
    ctx.canvas.height = ctx.canvas.originalheight;
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLables,
            datasets: [{
                label: 'Daily Volume - Past 7 Days',
                data: volumeDataArr,
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


