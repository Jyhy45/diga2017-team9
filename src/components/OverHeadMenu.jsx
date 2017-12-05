import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class OverHeadMenu extends Component {
constructor(props) {
    super(props);
 
    this.buttonClicked = this.buttonClicked.bind(this);
}

buttonClicked(itemName){
    console.log("button clicked "+itemName);
    this.props.tabSelected(itemName);
}

    render() {
        return (
            <div className="btn-group" role="group">
                <button type="button" className={(this.props.selectedTab === "Landing_Page")? "btn btn-lg btn-primary" :"btn btn-lg"}
                onClick={()=>this.buttonClicked("Landing_Page")}>
                Landing Page</button>
                <button type="button" className={(this.props.selectedTab === "APP")? "btn btn-lg btn-primary" :"btn btn-lg"}
                onClick={()=>this.buttonClicked("APP")}>
                APP</button>
                <button type="button" className={(this.props.selectedTab === "Contact")? "btn btn-lg btn-primary" :"btn btn-lg"}
                onClick={()=>this.buttonClicked("Contact")}>
                Contact</button>
                    
                    
                               
            </div>
        );
    }
}

export default OverHeadMenu;
