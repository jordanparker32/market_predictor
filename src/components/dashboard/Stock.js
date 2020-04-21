import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

class Stock extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
        }
    }

    createData(day, value) {
        return { day, value };
    }


    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;

        //Stock symbol to use in query
        let stockSymbol = 'AMZN';

        //Alhpa Advantage
        const API_KEY = 'Y1AE6RKTQSN1HA85';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

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
                    //X values/key = day in 2020-04-13 format
                    stockChartXValuesFunction.push(key);
                    //Y value = closing price for the day
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['4. close']); // = [Time Series (Daily)][2020-04-09][4. close]
                }

                //console.log(stockChartXValuesFunction);
                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction
                });
            }
        )
        .catch(err => {
            console.log(err);
        });

        //Yahoo Finance
        /*
        let API_CALL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=1546448400&period2=1562086800&symbol=${stockSymbol}` 
        fetch(API_CALL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "x-rapidapi-key": "8988274e15msh2d13d83d69b1f1ep1f3778jsn04038dd94367"
            }
        })
        .then(
            function(response) {
                return response.json();
            }
        )
        .then (
            function(data) {
                console.log(data);
            }
        )
        .catch(err => {
            console.log(err);
        });
        */
    }

    render () {
        return (
            <React.Fragment>
                <Title>Stock - Amazon</Title>
                <ResponsiveContainer>
                <LineChart
                    data={this.state.chartData}
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
                    <Tooltip/>
                </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        )
    }
}

export default Stock;