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
        this.setState({id: this.props.aSignleIndicatorCategory.id, 
            isMandatory: this.props.aSignleIndicatorCategory.isMandatory, 
            name: this.props.aSignleIndicatorCategory.name, 
            order: this.props.aSignleIndicatorCategory.order,
            indicators: this.props.aSignleIndicatorCategory.indicators
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
                                    setIndicatorsSelected = {this.props.setIndicatorsSelected}
                                    key = {element.id} />
                    )
                }
                </div>
            )}
        return (
            <div className = 'row' >
            <br/>
            <div className ="row" > <b>{this.state.name}</b></div>
                {content}
            </div>
        )
    }
}

export default ItemsSelector