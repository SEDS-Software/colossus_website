import React from 'react';
import updateData from "../utils/UpdateValues"
import Thrust from "./Thrust.jsx"
import BarGraphs from "./BarGraphs.jsx"
import Dropdown from "./Dropdown";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.warningMsgs  = {
            "W01": "Over pressurization: Propellant",
            "W02": "Over pressurization: Oxidizer",
            "W03": "Under pressurization: Propellant",
            "W04": "Under pressurization: Oxidizer",
            "W05": "low K bottle pressure / replace K bottle",
            "W06": "LOX temperature too high at T-OX-390",
            "W07": "LOX temperature too high at T-OX-391",
            "W08": "LOX temperature too high at T-OX-393"
        };
        this.errorMsgs = {
            "E01": "Propellant over pressurization",
            "E02": "Oxidizer over pressurization"
        };

        this.state = {
            autoScroll:true,
            doneOnce: false,
            updateRate: 2000,
            ecSteps: ["Count Down", "E-match Ignition", "PBV 253, 353 OPEN (wait for limit switch confirmation)", "Firing is happening now. Wait a couple of seconds", "Check for load cell on the engine reaches 0", "Check load cell on both tanks reaches 0", "Wait 1 second", "PBV 251, 351 OPEN (wait for limit switch confirmation)", "PBV 250, 350, 253, 353 CLOSE (wait for limit switch confirmation)", "PBV 150, 151 OPEN (wait for limit switch confirmation)", "Waiting"],
        };

        this.updateValues = this.updateValues.bind(this);

        // setInterval(() => this.updateValues(), this.state.updateRate);

        this.updateValues();

        this.Loaded = this.Loaded.bind(this);
        App.autoScroll = App.autoScroll.bind(this);
        this.switchAutoScroll = this.switchAutoScroll.bind(this);
        this.DataDump = this.DataDump.bind(this);
    }

    static Loading(props) {
        return (
            <h3 style={{color: "red"}}>Trying to connect to the API</h3>
        );
    }

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

        let warnings = [];
        let errors = [];

        let valves = {};
        let thermocouples = {};
        let pressureTranducer = {};


        for (let k in this.state) {
            if (this.state.hasOwnProperty(k)) {
                let val = this.state[k];
                if (k.startsWith('Val')) {
                    if (val === "0") {
                        valves[k.substr(3)] = "closed"
                    }
                    else if(val === "1") {
                        valves[k.substr(3)] = "opened"
                    }
                    else{
                        valves[k.substr(3)] = "unreadable"
                    }
                }
                else if(k.startsWith("PT")){
                    if(val){
                        pressureTranducer[k.substr(2)] = (val - .5) * 375;
                    }
                    else{
                        pressureTranducer[k.substr(2)] = "unreadable";
                    }

                }
                else if(k.startsWith("T") && k.length === 4){
                    thermocouples[k.substr(1)] = val;
                }
                else if(k.startsWith("W")){
                    if("1" === val){
                        warnings.push(<p key={k}>{k}: {this.warningMsgs[k]}</p>);
                    }
                }
                else if(k.startsWith("E")){
                    if("1" === val){
                        errors.push(<p key={k}>{k}: {this.errorMsgs[k]}</p>);
                    }
                }
                else if(k === "ecSteps" || k === "doneOnce" || k === "updateRate" || k === "SeqStage" || k === "autoScroll"){}
                else {
                    dataDump[k] = val;
                }

            }
        }
        if(warnings.length === 0){
            warnings.push(<p key={0}>No Warnings</p>)
        }
        if(errors.length === 0){
            errors.push(<p key={0}>No Errors</p>)
        }

        let dump = [{},{},{}];


        let devizor = Object.keys(dataDump).length/3;

        Object.keys(dataDump).map((k, index) => {
            dump[Math.floor(index / devizor)][k] = dataDump[k];
        });

        let DataDump = this.DataDump;

        let sequence = [];

        for(let i = 0; i < this.state.ecSteps.length; i ++){
            if(String(i) === String(this.state.SeqStage)){
                sequence.push(<h3 id="selectedThing" key={i} style={{color: "red"}}>{i}. {this.state.ecSteps[i]}</h3>);
            }
            else{
                sequence.push(<h3 key={i} style={{color: "black"}}>{i}. {this.state.ecSteps[i]}</h3>);
            }


        }



        return (
            <div>
                <div style={{textAlign:"center"}} className="col-xs-12">
                    <h3>Current Execution Cue Step:</h3>
                    <div id="scrollBox">
                        {sequence}
                    </div>
                    <button className="dropbtn" style={{width:"auto", marginTop:"9px"}} onClick={this.switchAutoScroll}>{this.state.autoScroll ? "Turn off AutoScroll" : "Turn on AutoScroll"}</button>
                </div>
                <div className="col-md-6 col-xs-12">
                    <h3>WARNINGS:</h3><h4 style={{color: "orange"}}>
                    {warnings}</h4>
                </div>
                <div className="col-md-6 col-xs-12">
                    <h3>ERRORS:</h3><h4
                    style={{color: "orange"}}>
                    {errors}</h4>
                </div>
                <div className="col-xs-12" style={{paddingTop:"30px", paddingBottom:"30px"}}>
                    <div className="col-md-4 col-xs-12">
                        <Dropdown id="valve" name="Valves" items={valves}/>
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <Dropdown id="thermo" name="Thermocouples" items={thermocouples}/>
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <Dropdown id="pressure" name="Pressure Transducer" items={pressureTranducer}/>
                    </div>
                </div>
                <div className="col-md-8 col-xs-12">
                    <h3>Thrust over past minute</h3>
                    <Thrust doneOnce={this.state.doneOnce} obj={this} updateRate={this.state.updateRate}
                            newData={this.state.Thrust}/>
                </div>
                <div className="col-md-4 col-cs-12">
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

        if((Object.keys(this.state).length > 4)){
            Body = App.Loading;
        }
        else{
            Body = this.Loaded;
        }

        return (
            <div className="main">
                <div className="container">
                    <div className="col-xs-12" style={{paddingTop:"15px"}}>
                        <div className="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1"><img style={{width:"100%", maxWidth:"100%"}} src="/colossus.png"/></div>
                        <div className="col-xs-12">
                            <h2>Data Viewer</h2>
                            <hr style={{width:"100%", borderTopColor:"#C8C8C8"}}/>
                        </div>
                    </div>
                    <Body/>
                </div>
            </div>


        );
    }


    componentDidUpdate(prevProps, prevState){
        if(this.state.autoScroll){
            App.autoScroll();
        }
    }

    static autoScroll(){
        if(!(Object.keys(this.state).length > 4)){
            let scrollBox = document.getElementById("scrollBox");
            let selectedThing = document.getElementById("selectedThing");

            let halfHeight = parseInt(window.getComputedStyle(scrollBox).height.substr(0, window.getComputedStyle(scrollBox).length - 2))/2;
            let fromTop = selectedThing.offsetTop;
            scrollBox.scrollTo(0, fromTop - halfHeight - 45);
        }
    }


    updateValues(){
        updateData(this);
    }

    switchAutoScroll(){
        this.setState({autoScroll:!this.state.autoScroll});
        App.autoScroll();
    }
}




