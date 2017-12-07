import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegionLevelSelector from './RegionLevelSelector'
import RegionSelector from './RegionSelector'
import ScenarioCollectionSelector from './ScenarioCollectionsSelector'
import ScenariosSelector from './ScenariosSelector'
import TimePeriodSelector from './TimePeriodSelector'

class ScenarioSelector extends Component {
    
    render() {
        return (
            
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                
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
                    regionLevel={this.props.regionLevel}/>
                    <ScenarioCollectionSelector
                    selectedScenarioCollection={this.props.selectedScenarioCollection}
                    selectedRegionLevel={this.props.selectedRegionLevel}
                    selectedRegion={this.props.selectedRegion}
                    regions={this.props.regions}
                    saveSelectedScenarioCollection={this.props.saveSelectedScenarioCollection}/>
                    <ScenariosSelector
                    scenarioCollection={this.props.scenarioCollection}
                    setSelectedScenarios={this.props.setSelectedScenarios}
                    selectedScenarios={this.props.selectedScenarios}/>
                    <TimePeriodSelector
                    selectedTimePeriod={this.props.selectedTimePeriod}
                    setSelectedTimePeriod={this.props.setSelectedTimePeriod}
                    scenarioCollection={this.props.scenarioCollection}/>
                    
            </div>
            
        );
    }
}

export default ScenarioSelector;