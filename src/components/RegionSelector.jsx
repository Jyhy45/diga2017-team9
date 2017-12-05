import React, { Component } from 'react';
import DataGetter from '../data/getData';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton,MenuItem,ButtonGroup} from 'react-bootstrap'

class RegionSelector extends Component {
constructor(props, context) {
  super(props, context);
  
  this.handleSelect = this.handleSelect.bind(this);
}
handleSelect(eventKey,event){
  console.log(eventKey);
  this.props.saveSelectedRegion(eventKey);
}

componentWillReceiveProps(nextProps){
  if(nextProps.selectedRegionLevel!==this.props.selectedRegionLevel){
    console.log("RegionSelector newProps");
    DataGetter.getRegionLevelById(nextProps.selectedRegionLevel).then(result =>{
      this.props.saveRegions(result);
      console.log(result);
    })
  }
}
  render() {
    
    return (
      <div className="row">
        <div className="row"> <b> Region </b></div>
        <ButtonGroup justified>
        <DropdownButton bsSize="large" 
                        title="Region" 
                        id="RegionSelectorDropdown" 
                        onSelect={this.handleSelect}
                        disabled = {this.props.regions!=null?false:true} >
          {this.props.regions!=null && this.props.regions.map(element => <MenuItem
                                  eventKey={element.id}
                                  key={element.id}
                                  active={element.id === this.props.selectedRegion? true:false}>
          {element.name}</MenuItem>)}
        
        </DropdownButton>
        </ButtonGroup>
      </div>
    );
  }
}

export default RegionSelector;

