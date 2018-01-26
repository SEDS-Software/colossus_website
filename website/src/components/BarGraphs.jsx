import Chart from 'chart.js';
import React from 'react';


export default class BarGraphs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate(){
        if(!this.props.doneOnce){
            let ctx = document.getElementById("tempChart");

            let newState = Object.assign({}, this.state);

            newState["chart1"] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Tank 1", "Tank 2"],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options:{
                    legend:{
                        display:false
                    }
                }
            });

            let ctx2 = document.getElementById("fuelChart");
            newState["chart2"] = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ["Tank 1", "Tank 2"],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options:{
                    legend:{
                        display:false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                suggestedMax: 100
                            }
                        }]
                    }
                }
            });

            this.setState(newState);

        }

    }

    render() {
        if(this.props.doneOnce){

            this.state.chart1.data.datasets.forEach((dataset) => {
                dataset.data = this.props.tempData;
            });
            this.state.chart1.update();


            this.state.chart2.data.datasets.forEach((dataset) => {
                dataset.data = this.props.fuelData;
            });
            this.state.chart2.update();
        }

        return (
            <div>
                <div className="col-md-12 col-sm-6 col-xs-12">
                    <h4>Temperature (Celsius)</h4>
                    <canvas id="tempChart" width="150" height="100"/>
                </div>
                <div className="col-md-12 col-sm-6 col-xs-12">
                    <h4>% Fuel Remaining</h4>
                    <canvas id="fuelChart" width="150" height="100"/>
                </div>
            </div>
        );
    }
}





