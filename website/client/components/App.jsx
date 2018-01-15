import React from 'react';
import updateData from "../utils/UpdateValues"
import Thrust from "./Thrust.jsx"
import BarGraphs from "./BarGraphs.jsx"


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {doneOnce:false, updateRate:2000};

        this.updateValues = this.updateValues.bind(this);

        setInterval(()=> this.updateValues(), this.state.updateRate);

        this.Loaded = this.Loaded.bind(this);
    }

    static Loading(props) {
        return (
            <h3 style={{color:"red"}}>Trying to connect to the API</h3>
        );
    }

    Loaded(props) {
        return (
            <div>
                <div className="col-md-8">
                    <h3>Thrust over past minute</h3>
                    <Thrust doneOnce={this.state.doneOnce} obj={this} updateRate={this.state.updateRate} newData={this.state.Thrust}/>
                </div>
                <div className="col-md-4">
                    <BarGraphs doneOnce={this.state.doneOnce} tempData={[this.state.Tank_Temp_1, this.state.Tank_Temp_2]} fuelData={[this.state.Tank_Fuel_1, this.state.Tank_Fuel_2]}/>
                </div>
            </div>
        );
    }


    render() {


        let Body;

        if(!(Object.keys(this.state).length > 3)){
            Body = App.Loading;
        }
        else{
            Body = this.Loaded;
        }

        return (
            <div className="main">
                <div className="container">
                    <h2>Colossus Data Viewer</h2>
                    <Body/>
                </div>
            </div>


        );
    }

    updateValues(){
        let newData = updateData(this);
    }
}




