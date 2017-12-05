import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//import {} from 'react-bootstrap'
import Indicators from './Indicators'

class ItemsSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            isMandatory: null,
            order: null,
            indicators: null
        }        
    }

    componentDidMount() {
        this.setState({id: this.props.items.id, 
            isMandatory: this.props.items.isMandatory, 
            name: this.props.items.name, 
            order: this.props.items.order,
            indicators: this.props.items.indicators
        });
    }
    
    render () {
        let content;
        console.log(this.state);
        if(this.state.indicators != null) {
                
            content = (
                <div>
                {
                    this.state.indicators.map(element =>  
                    <Indicators items = {element}
                                    indicatorSelected = {this.props.indicatorSelected}
                                    key = {element.id} />
                    )
                }
                </div>
            )}
        return (
            <div className = 'row' >
            <div className = 'col-md-12'><br/><b>{this.state.name}</b></div><br/>
                {content}
            </div>
        )
    }
}

export default ItemsSelector