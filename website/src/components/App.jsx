import React from 'react';
import updateData from "../utils/UpdateValues"
import Thrust from "./Thrust.jsx"
import BarGraphs from "./BarGraphs.jsx"


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            doneOnce: false,
            updateRate: 2000,
            ecSteps: ["Count Down", "E-match Ignition", "PBV 253, 353 OPEN (wait for limit switch confirmation)", "Firing is happening now. Wait a couple of seconds", "Check for load cell on the engine reaches 0", "Check load cell on both tanks reaches 0", "Wait 1 second", "PBV 251, 351 OPEN (wait for limit switch confirmation)", "PBV 250, 350, 253, 353 CLOSE (wait for limit switch confirmation)", "PBV 150, 151 OPEN (wait for limit switch confirmation)", "Waiting"]
        };

        this.updateValues = this.updateValues.bind(this);

        setInterval(() => this.updateValues(), this.state.updateRate);

        this.Loaded = this.Loaded.bind(this);
        this.DataDump = this.DataDump.bind(this);
    }

    static Loading(props) {
        return (
            <h3 style={{color: "red"}}>Trying to connect to the API</h3>
        );
    }

    //I need make this more efficient
    DataDump(props) {
        let arr = [];
        Object.keys(props.dump).map((k, index) => {
            arr.push(
                <li key={index}>
                    {k}: {props.dump[k]}
                </li>
            );
        });
        return(arr);

    }

    Loaded(props) {
        let dataDump = {};

        for (let k in this.state) {
            if (this.state.hasOwnProperty(k)) {
                let val = this.state[k];
                if (k.startsWith('Val')) {
                    if (val === "0") {
                        dataDump[k] = "closed"
                    }
                    else {
                        dataDump[k] = "opened"
                    }
                }
                else if(k === "ecSteps" || k === "doneOnce" || k === "updateRate" || k === "SeqStage"){}
                else {
                    dataDump[k] = val;
                }

            }
        }

        let dump = [{},{},{}];


        let devizor = Object.keys(dataDump).length/3;

        Object.keys(dataDump).map((k, index) => {
            dump[Math.floor(index / devizor)][k] = dataDump[k];
        });

        let DataDump = this.DataDump;

        return (
            <div>
                <div className="col-xs-12">
                    <h3>Current Execution Cue Step:</h3><h3
                    style={{color: "red"}}>{this.state.SeqStage}. {this.state.ecSteps[this.state.SeqStage]}</h3>
                </div>
                <div className="col-md-8">
                    <h3>Thrust over past minute</h3>
                    <Thrust doneOnce={this.state.doneOnce} obj={this} updateRate={this.state.updateRate}
                            newData={this.state.Thrust}/>
                </div>
                <div className="col-md-4">
                    <BarGraphs doneOnce={this.state.doneOnce}
                               tempData={[this.state.Tank_Temp_1, this.state.Tank_Temp_2]}
                               fuelData={[this.state.Tank_Fuel_1, this.state.Tank_Fuel_2]}/>
                </div>
                <div className="col-xs-12">
                    <h3>Data Dump</h3>
                    <div className="col-md-4">
                        <ul>
                            <DataDump dump={dump[0]} num="0"/>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <DataDump dump={dump[1]} num="1"/>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <DataDump dump={dump[2]} num="2"/>
                        </ul>
                    </div>
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
        updateData(this);
    }
}




