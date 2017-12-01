import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton,MenuItem} from 'react-bootstrap'
import DataGetter from '../data/getData'

class RegionLevelSelector extends Component {
  constructor(props){
    super(props);


    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount(){
    DataGetter.getRegionLevels().then(results =>{
        this.props.saveRegionLevels(results)
    });


}
  componentWillReceiveProps(nextProps){
    
  }

  handleSelect(eventKey,event){
    console.log(eventKey);
    this.props.saveSelectedRegionLevel(eventKey);
    if (this.props.selectedRegionLevel!=eventKey) {
      this.props.saveSelectedRegion(null);
    }
  }
  
  render() {
    console.log("selectooooor");
    console.log(this.props.regions);
    
  

    return (
      <div className = "row">
      <div> <b> Region Level</b></div>
        <DropdownButton bsSize="large"
                        title="Region Level" 
                        id="RegionLevelSelectorDropdown" 
                        onSelect={this.handleSelect}
                        disabled = {this.props.regionLevel!=null?false:true} >
          {this.props.regionLevel!=null && this.props.regionLevel.map(element => <MenuItem
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