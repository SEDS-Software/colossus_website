import React from 'react';


export default class Dropdown extends React.Component {

    render() {

        let arr = [];

        if(this.props.items){
            Object.keys(this.props.items).map((k, index) => {
                arr.push(
                    <a href="#" key={index}>
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





