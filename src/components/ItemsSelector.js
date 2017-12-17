import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ToggleButton, ToggleButtonGroup, OverlayTrigger, Popover} from 'react-bootstrap'

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
    
    onChange = (value) => {
        this.props.setIndicatorsSelected(value);
    };

    render () {
        let content;
            content = (
                <div>
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
                </div>
            )
        return (
            <div className ="row" > <br/> <b>{this.state.name}</b>
            {content}
            </div>
        )
    }
}

export default ItemsSelector