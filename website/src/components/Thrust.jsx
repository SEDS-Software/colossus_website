import Chart from 'chart.js';
import React from 'react';


export default class Thrust extends React.Component {

    componentDidUpdate(){
        if(!this.props.doneOnce){
            let ctx = document.getElementById("myChart");
            this.props.obj.setState({doneOnce:true});
            this.setState({chart:new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: "Thrust in lbs (may be mapped wrong)",
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                        ],
                        borderWidth: 1
                    }]
		},
		options: {
		    animation: {
			duration: 0, // general animation time
		    },
		    hover: {
			animationDuration: 0, // duration of animations when hovering an item
		    },
		    responsiveAnimationDuration: 0, // animation duration after a resize
		}
	    })});

        }

    }

    render() {
        if(this.props.doneOnce){
            let d = new Date();
            let n = d.getSeconds();
            let label = n;

            let removeItem = false;
            if(this.state.chart.data.labels.length > 60000 / this.props.updateRate){
                removeItem = true;
            }


            this.state.chart.data.labels.push(label);
            if(removeItem){
                this.state.chart.data.labels.splice(0, 1);
            }
            this.state.chart.data.datasets.forEach((dataset) => {
                dataset.data.push(this.props.newData * 1000 / 2.5);
                if(removeItem) {
                    dataset.data.splice(0, 1);
                }

            });
            this.state.chart.update();
        }
        return (
            <canvas id="myChart" width="150" height="100"/>
        );
    }
}





