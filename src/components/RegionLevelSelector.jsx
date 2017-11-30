import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton,MenuItem} from 'react-bootstrap'

class RegionLevelSelector extends Component {
  render() {
    console.log("selectooooor");
    console.log(this.props.regions);
    
    return (
      <div className = "row">
      <div> <b> Region Level</b></div>
        <DropdownButton bsSize="large" title="Region Level" key="1" >
          {this.props.regions.map(element => <MenuItem
                                  eventKey={element.id}
                                  >
                                  {element.name}</MenuItem>)}
        
        </DropdownButton>
      </div>
    );
  }
}

export default RegionLevelSelector;