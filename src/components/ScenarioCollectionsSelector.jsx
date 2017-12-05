import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton,MenuItem} from 'react-bootstrap'
import DataGetter from '../data/getData'


class ScenarioCollectionsSelector  extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
  }
  

  handleSelect(eventKey,event){
    console.log(eventKey);
    this.props.saveSelectedScenarioCollection(eventKey);
  }

  render() {
    const indexOfRegion = this.props.regions!=null ? 
                        this.props.regions.findIndex(element=>element.id===this.props.selectedRegion)
                        : null;
    return (
      <div className="row">
      <div> <b> Sceneario Collection</b></div>
      <DropdownButton bsSize="large"
                      title="Sceneario Collection" 
                      id="Sceneario Collection Selector Dropdown" 
                      onSelect={this.handleSelect}
                      disabled = {(this.props.regions!=null
                        &&this.props.regions[indexOfRegion]!=null 
                        && this.props.regions[indexOfRegion].scenarioCollections!=null) ?false:true} >
        {this.props.regions!=null
        &&this.props.regions[indexOfRegion]!=null 
        && this.props.regions[indexOfRegion].scenarioCollections!=null 
        && this.props.regions[indexOfRegion].scenarioCollections.map(element => <MenuItem
                                eventKey={element.id}
                                key={element.id}
                                active={element.id === this.props.selectedScenarioCollection? true:false}>
                                {element.name}</MenuItem>)}
      
      </DropdownButton>
      </div>
    );
  }
}

export default ScenarioCollectionsSelector;