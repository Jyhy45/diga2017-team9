import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap'

class TimePeriodSelector extends Component {

  onChange = (value)=>{
    this.props.setSelectedTimePeriod(value);
  };

  render() {
    return (
      <div>
        <div className ="row"><b> Time Period Selector </b></div>
        <div className="row">
          <ToggleButtonGroup
          name="timePeriosselectorRadioButtons"
          vertical
          block
          type="radio"
          value={this.props.selectedTimePeriod}
          onChange={this.onChange}>
            {this.props.scenarioCollection!=null
              && this.props.scenarioCollection[0]!=null
              && this.props.scenarioCollection[0].timePeriods!=null
              && this.props.scenarioCollection[0].timePeriods.map(element => 
              <ToggleButton key={element.id} value={element.id}>{element.yearStart} - {element.yearEnd}</ToggleButton>
            )}
            </ToggleButtonGroup> 
        </div>
      </div>
    );
  }
}

export default TimePeriodSelector;