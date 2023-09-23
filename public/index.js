//retrieve stock data from http://twelvedata.com/
//make sure to read documentation https://twelvedata.com/docs#stocks
//Make sure to use the api secret to
let api_base_url = "https://twelvedata.com"
async function getStocksFromApi(){
    try {
        let response = fetch(api_base_url, {
            headers:{
                //pass api secrete here
            }
        })

        let data = null
    
        //change shape of response and return data to caller
        return  [data.GME, data.MSFT, data.DIS, data.BTNX]   
    } catch (error) {
        console.error("error getting stocks from api",error)
    }
    
}

//helper function used to display chart color
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {    
    //pulling the mock data temporarily from our file
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];
    //when you finish api use this line instead
    //const stocks = await getStocksFromApi()

    //print out the GME stock prices
    console.log(stocks[0].values)

    const timeChartCanvas = document.querySelector('#time-chart');
    //Start coding the first chart here since it references the canvas on line 3   
    stocks.forEach( stock=> stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock=> ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}



    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    var getHighestStockValue = function(stock) {
        //stock.values.map(value => parseFloat(value.high))
        console.log(stock)
        let v= stock.values.reduce(
            (a,b) => { 
                if(typeof a === 'object') 
                    return Math.max(parseFloat(a.high),parseFloat(b.high));
                else
                    return Math.max(a, parseFloat(b.high));
                }
            )
        console.log(v)
        return v
    }
    
    //build your second chart
    const config = {
        type: 'bar',
        data: {
            //labels: stocks[0].values.map(value => value.meta.symbol),
            labels: stocks.map(value=> value.meta.symbol),
            datasets: [
                {
                    label:'Highest',
                    data: stocks.map(stock => getHighestStockValue(stock)),
                    // backgroundColor:  getColor(DIS.meta.symbol),
                    backgroundColor: stocks.map(value =>  getColor(value.meta.symbol)),
                    borderColor: stocks.map(value =>  getColor(value.meta.symbol))
                }
            ]
            // datasets: stocks.map( stock=> ({
            //     label: stock.meta.symbol,
            //     data: getHighestStockValue(),
            //     backgroundColor:  getColor(stock.meta.symbol),
            //     borderColor: getColor(stock.meta.symbol),
            // }))
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                }
            }
        },
    };
    console.log(config);
    function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

    new Chart(highestPriceChartCanvas.getContext('2d'), config);

    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //this is the bonus you don't have to do it

}

main()