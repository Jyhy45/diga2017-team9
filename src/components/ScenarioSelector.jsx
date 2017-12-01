import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegionLevelSelector from './RegionLevelSelector'
import RegionSelector from './RegionSelector'

class ScenarioSelector extends Component {
    
    render() {
        return (
            
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="row">
                    <RegionLevelSelector
                    selectedRegionLevel={this.props.selectedRegionLevel}
                    saveSelectedRegionLevel={this.props.saveSelectedRegionLevel}
                    saveSelectedRegion={this.props.saveSelectedRegion}
                    saveRegions={this.props.saveRegions}
                    saveRegionLevels={this.props.saveRegionLevels}
                    regions={this.props.regions}
                    regionLevel={this.props.regionLevel}/>
                    <RegionSelector
                    selectedRegionLevel={this.props.selectedRegionLevel}
                    selectedRegion={this.props.selectedRegion}
                    saveSelectedRegion={this.props.saveSelectedRegion}
                    saveRegions={this.props.saveRegions}
                    saveRegionLevels={this.props.saveRegionLevels}
                    regions={this.props.regions}
                    regionLevel={this.props.regionLevel}
                    />
                </div>
            </div>
            
        );
    }
}

export default ScenarioSelector;