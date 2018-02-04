import React from 'react';


export default class Dropdown extends React.Component {

    render() {

        let arr = [];

        if(this.props.items){
            Object.keys(this.props.items).map((k, index) => {
                let theClass = "";
                if(this.props.items[k] === "opened"){
                    theClass = "green";
                }
                else if(this.props.items[k] === "closed"){
                    theClass = "red";
                }
                arr.push(
                    <a href="#" className={theClass} key={index}>
                        {k}: {this.props.items[k]}
                    </a>
                );
            });
        }

        return (
            <div className="dropdown col-xs-12">
                <button id={this.props.id} className="dropbtn">{this.props.name ? this.props.name : "Loading"}<span className="caret"/></button>
                <div id={this.props.id + "content"} className="dropdown-content">
                    {arr}
                </div>
            </div>

        );
    }
    componentDidMount(){
        document.getElementById(this.props.id).onfocus = () => {
            document.getElementById(this.props.id + "content").style.display = "block"
        };

        document.addEventListener("focusout", () => {
            document.getElementById(this.props.id + "content").style.display = "none"
        });
    }
}





