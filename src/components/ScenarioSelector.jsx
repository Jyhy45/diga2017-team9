import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataGetter from '../data/getData';
import RegionLevelSelector from './RegionLevelSelector'

class ScenarioSelector extends Component {
    constructor(props){
        super(props);

        this.state={
            regions:[]
        }
    }
    
    componentDidMount(){
        DataGetter.getRegionLevels().then(results =>{
            this.setState({
                regions: results
            });
            console.log(this.state.regions);
        });

    }
    render() {
        return (
            
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="row">
                    <RegionLevelSelector
                    regions={this.state.regions}
                    selectedRegionLevel={this.props.selectedRegionLevel}
                    saveSelectedRegionLevel={this.props.saveSelectedRegionLevel}/>
                </div>
            </div>
            
        );
    }
}

export default ScenarioSelector;