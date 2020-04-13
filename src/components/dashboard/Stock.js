import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

class Stock extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            data: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    createData(day, value) {
        return { day, value };
    }

    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);

        //API key for alhpa advantage
        const API_KEY = 'Y1AE6RKTQSN1HA85';
        let stockSymbol = 'AMZN';

        //Alhpa Advantage
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let dataToPlot = [];

        //Yahoo Finance
        //let API_CALL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-histories?region=US&lang=en&symbol=${stockSymbol}&from=1231866000&to=1547524844&events=div&interval=1d`
        /*fetch(API_CALL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "x-rapidapi-key": "8988274e15msh2d13d83d69b1f1ep1f3778jsn04038dd94367"
            }
        })*/
        fetch(API_CALL)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then (
            function(data) {
                console.log(data);

                for(var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)']
                    [key]['4. close']); // = [Time Series (Daily)][2020-04-09][4. close]
                    dataToPlot.push(key)
                }

                //console.log(stockChartXValuesFunction);
                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction,
                    dataToPlot: data
                });
            }
        )
        .catch(err => {
            console.log(err);
        });
    }


    data = [
        this.createData(this.stockChartXValues, this.stockChartYValues)
    ];

    render () {
        return (
            <React.Fragment>
                <Title>Stock - Amazon</Title>
                <ResponsiveContainer>
                <LineChart
                    data={this.data}
                    margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                    }}
                >
                    <XAxis dataKey="day" />
                    <YAxis>
                    <Label
                        angle={270}
                        position="left"
                        style={{ textAnchor: 'middle'}}
                    >
                        Stock Price ($)
                    </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="value" dot={false} />
                </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        )
    }
}

export default Stock;