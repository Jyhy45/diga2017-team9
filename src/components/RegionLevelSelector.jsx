import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton,MenuItem} from 'react-bootstrap'

class RegionLevelSelector extends Component {
  constructor(props){
    super(props);

    this.state={
      selectedRegionLevel: this.props.selectedRegionLevel
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey,event){
    console.log(eventKey);
    this.props.saveSelectedRegionLevel(eventKey);
  }

  render() {
    console.log("selectooooor");
    console.log(this.props.regions);
    

    return (
      <div className = "row">
      <div> <b> Region Level</b></div>
        <DropdownButton bsSize="large" title="Region Level" id="RegionSelectorDropdown" onSelect={this.handleSelect} >
          {this.props.regions.map(element => <MenuItem
                                  eventKey={element.id}
                                  key={element.id}
                                  active={element.id === this.props.selectedRegionLevel? true:false}>
                                  {element.name}</MenuItem>)}
        
        </DropdownButton>
      </div>
    );
  }
}

export default RegionLevelSelector;