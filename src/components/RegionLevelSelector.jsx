import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropdownButton,MenuItem, ButtonGroup,Tooltip,OverlayTrigger} from 'react-bootstrap'
import './RegionLevelSelector.css'

class RegionLevelSelector extends Component {
  constructor(props){
    super(props);


    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(nextProps){
    
  }

  handleSelect(eventKey,event){
    //console.log(eventKey);
    this.props.saveSelectedRegionLevel(eventKey);
  }
  
  render() {
    //console.log("selectooooor");
    //console.log(this.props.regions);
    let title;
    if(this.props.selectedRegionLevel==null){
      title = "Region Level";
    }else{
      const index = this.props.regionLevel.findIndex(element=>element.id===this.props.selectedRegionLevel);
      title = this.props.regionLevel[index].name;
    }


    return (
      <div className = "row">
      <div> <b> Region Level</b></div>
        <ButtonGroup justified>
          <DropdownButton bsSize="large"
                          title={title}
                          id="RegionLevelSelectorDropdown" 
                          onSelect={this.handleSelect}
                          disabled = {this.props.regionLevel!=null?false:true} >
            {this.props.regionLevel!=null && this.props.regionLevel.map(element => <MenuItem
                                    eventKey={element.id}
                                    key={element.id}
                                    active={element.id === this.props.selectedRegionLevel? true:false}>
                                    <OverlayTrigger overlay={<Tooltip
                                        id="tooltip"><strong>{element.description}</strong></Tooltip>}
                                        placement="right" >
                                    <span style={{display:'block'}}>
                                      {element.name}
                                    </span>
                                    </OverlayTrigger>
                                    </MenuItem>)}
        
        </DropdownButton>
        </ButtonGroup>
        
      </div>
    );
  }
}

export default RegionLevelSelector;