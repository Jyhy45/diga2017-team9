import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap'

class ScenariosSelector extends Component {

  onChange = (value)=>{
    this.props.setSelectedScenarios(value);
  };


  render() {
    return (
      <div>
        <div className ="row"><b> Scenario Selector </b></div>
        <div className="row">
          <ToggleButtonGroup
          vertical
          block
          type="checkbox"
          value={this.props.selectedScenarios}
          onChange={this.onChange}>
            {this.props.scenarioCollection!=null
              && this.props.scenarioCollection[0]!=null
              && this.props.scenarioCollection[0].scenarios!=null
              && this.props.scenarioCollection[0].scenarios.map(element => 
              <ToggleButton value={element.id}>{element.name}</ToggleButton>
            )}
            </ToggleButtonGroup> 
        </div>
      </div>
    );
  }
}

export default ScenariosSelector;