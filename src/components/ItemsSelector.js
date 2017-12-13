import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ToggleButton, ToggleButtonGroup, Tooltip, OverlayTrigger, Popover} from 'react-bootstrap'

class ItemsSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            values: []
        }        
    }

    componentDidMount() {
        this.setState({id: this.props.aSignleIndicatorCategory.id, 
            name: this.props.aSignleIndicatorCategory.name 
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({id: nextProps.aSignleIndicatorCategory.id, 
                name: nextProps.aSignleIndicatorCategory.name 
            });
        }
    }

    onChange = (value) => {
        console.log("onChange() called");
        this.props.setIndicatorsSelected(this.state.id, value);
    };

    render () {
        return (
            <div className ="row" > <br/> <b>{this.state.name}</b>
            <ToggleButtonGroup
            vertical
            block
            type="checkbox"
            value={this.props.selectedIndicatorCategories}
            onChange={this.onChange}
            >
            { this.props.aSignleIndicatorCategory.indicators.map(element => 
              <ToggleButton
                key = { element.id } 
                value = { element.id }>
                <OverlayTrigger overlay={
                    <Popover id = {element.id} 
                    title = { element.name }>
                    { element.description }
                    </Popover> }
                    placement = "left" >
                  <div>
                  {element.name}
                  </div>
                  </OverlayTrigger>
              </ToggleButton>
            )}
            </ToggleButtonGroup> 
            </div>
        )
    }
}

export default ItemsSelector