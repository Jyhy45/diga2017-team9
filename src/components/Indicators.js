import React, { Component } from 'react'
import './Indicators.css'
import {Popover, OverlayTrigger} from 'react-bootstrap'

class Indicators extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            description: null,
            absVar: null,
            order: null,
            isSelected: null
        }
    
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.items.id,
            name: this.props.items.name,
            description: this.props.items.description,
            absVar: this.props.items.absVar,
            order: this.props.items.order,
            isSelected: false
        })
    }

    handleSelect(itemId) {
        this.setState({isSelected: !this.state.isSelected});
        this.props.indicatorSelected(this.state.id);
        console.log(this.state);
    }

    render () {
        if(this.state != null) {
            //console.log(this.state);
        }
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Description">
              {this.state.description}
            </Popover>
          );
        return (
            
            <div className = { this.state.isSelected ? "row itemIsSelected" : "row" }
            onClick= {() => this.handleSelect(this.state.id)}>
                
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
                    <div className = 'col-md-12'>
                        {this.state.name}
                    </div>
                </OverlayTrigger>
            </div>
        )
    }
}

export default Indicators