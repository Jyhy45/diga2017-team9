import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ToggleButton, ToggleButtonGroup, Tooltip, OverlayTrigger, Popover} from 'react-bootstrap'

class ItemsSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            isMandatory: null
        }        
    }

    componentDidMount() {
        this.setState({id: this.props.aSignleIndicatorCategory.id, 
            name: this.props.aSignleIndicatorCategory.name,
            isMandatory: this.props.aSignleIndicatorCategory.isMandatory 
        });

    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({id: nextProps.aSignleIndicatorCategory.id, 
                name: nextProps.aSignleIndicatorCategory.name,
                isMandatory: nextProps.aSignleIndicatorCategory.isMandatory
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== null
        ) {
            


            //console.log("componentDidUpdate()", this.props, prevProps, prevState)            
        }

                /*if ( !this.props.selectedIndicatorCategories.includes(this.state.id) ) {
            console.log("componenetDidUpdate()")
                    
        }*/
        /*if ( this.state.isMandatory 
            && !this.props.selectedIndicatorCategories.includes(this.state.id) )*/
    }

    onChange = (value) => {
        console.log("onChange() called", this.props.selectedIndicators);
        this.props.setIndicatorsSelected(value);
    };

    render () {
        let content;
        if ( this.state.isMandatory ) {
            content = (
                <div>
                <ToggleButtonGroup
                vertical
                block
                type="checkbox"
                value={this.props.selectedIndicators}
                onChange={this.onChange}
                defaultValue = {this.props.aSignleIndicatorCategory.indicators[0].id}
                >
                { this.props.aSignleIndicatorCategory.indicators.map(element => 
                  <ToggleButton
                    key = { element.id } 
                    value = { element.id }
                    >
                    <OverlayTrigger overlay={
                        <Popover id = {element.id} 
                        title = { element.name }>
                        { element.description }
                        </Popover> }
                        placement = "left" >
                      <div>
                      { element.name }
                      </div>
                      </OverlayTrigger>
                  </ToggleButton>
                )}
                </ToggleButtonGroup> 
                </div>
            )
        } else {
            content = (   
                <ToggleButtonGroup
                vertical
                block
                type="checkbox"
                value={this.props.selectedIndicators}
                onChange={this.onChange}
                >
                { this.props.aSignleIndicatorCategory.indicators.map(element => 
                  <ToggleButton
                    key = { element.id } 
                    value = { element.id }
                    >
                    <OverlayTrigger overlay={
                        <Popover id = {element.id} 
                        title = { element.name }>
                        { element.description }
                        </Popover> }
                        placement = "left" >
                      <div>
                      { element.name }
                      </div>
                      </OverlayTrigger>
                  </ToggleButton>
                )}
                </ToggleButtonGroup> 
            ) 
        }
        
        
        return (
            <div className ="row" > <br/> <b>{this.state.name}</b>
            {content}
            </div>
        )
    }
}

export default ItemsSelector