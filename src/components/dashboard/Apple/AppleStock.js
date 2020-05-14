import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from '../Title';
import axios from 'axios';

class AppleStock extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            chartData: [],
        }
    }

    componentDidMount() {
        if(!this.state.chartData.length) {
            this.fetchStock();
        }
    }

    fetchStock() {
        const pointerToThis = this;

        //Stock symbol to use in query
        let stockSymbol = 'AAPL';

        //Alhpa Advantage
        const API_KEY = 'Y1AE6RKTQSN1HA85';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let chartData = [];

        axios.get(API_CALL).then((response) => {
            const {data} = response

            for(var key in data['Time Series (Daily)']) {
                const chartItem = {date: key, value:data['Time Series (Daily)'][key]['4. close']}
                chartData.push(chartItem)
            }

             //console.log(stockChartXValuesFunction);
             pointerToThis.setState({
                chartData
            });
        })
    }

    render () {
        return (
            <>
                <Title>Apple Stock History</Title>
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
                    <XAxis dataKey="date" />
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
            </>
        )
    }
}

export default AppleStock;