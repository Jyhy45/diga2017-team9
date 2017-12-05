import React, { Component } from 'react';
import 'jquery'
import './App.css';
import Menu from './components/OverHeadMenu'
import ScenarioSelector from './components/ScenarioSelector'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataGetter from './data/getData'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedTab: "Landing_Page",
      selectedRegionLevel: null,
      selectedRegion: null,
      regionLevel:null,
      regions:null,
      selectedScenarioCollection:null,
      scenarioCollection:null,
      selectedScenarios:null,
      selectedTimePeriod:[]

    }
    this.tabSelected = this.tabSelected.bind(this);
    this.saveSelectedRegionLevel = this.saveSelectedRegionLevel.bind(this);
    this.saveSelectedRegion = this.saveSelectedRegion.bind(this);
    this.saveRegions = this.saveRegions.bind(this);
    this.saveRegionLevels = this.saveRegionLevels.bind(this);
    this.saveSelectedScenarioCollection = this.saveSelectedScenarioCollection.bind(this);
    this.setSelectedScenarios = this.setSelectedScenarios.bind(this);
    this.setSelectedTimePeriod = this.setSelectedTimePeriod.bind(this);
  
  }

  componentWillUpdate(nextProps, nextState)
  {
    //logic for fetching scenariocollection ... regionid and colletionid must be known
    if (nextState !== this.state){
      if (nextState.selectedRegionLevel!==this.state.selectedRegionLevel) {
        DataGetter.getRegionLevelById(nextState.selectedRegionLevel).then(result =>{
          this.setState({regions: result});
        })
      }
      if (nextState.selectedScenarioCollection!=null) {
        if (this.state.selectedScenarioCollection!==nextState.selectedScenarioCollection) {
          DataGetter.getScenarioCollectionById(nextState.selectedRegion,nextState.selectedScenarioCollection)
          .then(result => {
            this.setState({scenarioCollection:result});
          });
        }
      }
    }
  }

  componentDidMount(){
    DataGetter.getRegionLevels().then(result => {this.setState({regionLevel:result});})
  }

  setSelectedTimePeriod(selectedTimePeriod){
    this.setState({selectedTimePeriod});
  }

  setSelectedScenarios(selectedScenariosArray){
    this.setState({
      selectedScenarios: selectedScenariosArray
    });
  }

  saveSelectedScenarioCollection(collectioId){
    this.setState({selectedScenarioCollection:collectioId,
                  selectedTimePeriod:null,
                  selectedScenarios:[]
                }); 
  }

  saveSelectedRegionLevel(regionLevelId){
    this.setState({selectedRegionLevel:regionLevelId,
                  selectedRegion:null,
                  selectedScenarioCollection: null,
                  regions: null,
                  scenarioCollection:null,
                  selectedTimePeriod:null,
                  selectedScenarios:[]
                });
  }
  
  saveSelectedRegion(regionId){
    this.setState({selectedRegion:regionId,
                  selectedScenarioCollection: null,
                  scenarioCollection:null,
                  selectedTimePeriod:null,
                  selectedScenarios:[]});
  }

  tabSelected(tabName){
    this.setState({selectedTab: tabName});
  }

  saveRegions(regions){
    this.setState({regions: regions});
  }

  saveRegionLevels(regionLevel)
  {
    this.setState({regionLevel: regionLevel});
  }

  render() {
    let content;
    
    switch (this.state.selectedTab) {
      case "Landing_Page":
        content = (
          <div>THIS IS LANDING PAGE</div>
        )
        break;
        
      case "APP":
        content = (
          <div>
            <ScenarioSelector
            selectedRegionLevel={this.state.selectedRegionLevel}
            selectedRegion={this.state.selectedRegion}
            saveSelectedRegionLevel={this.saveSelectedRegionLevel}
            saveSelectedRegion={this.saveSelectedRegion}
            saveRegions={this.saveRegions}
            saveRegionLevels={this.saveRegionLevels}
            regions={this.state.regions}
            regionLevel={this.state.regionLevel}
            selectedScenarioCollection={this.state.selectedScenarioCollection}
            saveSelectedScenarioCollection={this.saveSelectedScenarioCollection}
            scenarioCollection={this.state.scenarioCollection}
            setSelectedScenarios={this.setSelectedScenarios}
            selectedScenarios={this.state.selectedScenarios}
            setSelectedTimePeriod={this.setSelectedTimePeriod}
            selectedTimePeriod={this.state.selectedTimePeriod}
            />
          </div>
        )
      break;
      case "Contact":
      content = (
        <div>THIS IS Contact PAGE</div>
      )
    break;
      default:
      content = (
        <div>THIS IS LANDING PAGE</div>
      )
        break;
    }
    return (
      <div className="App">
        <header className="App-header">
          <Menu
          selectedTab = {this.state.selectedTab}
          tabSelected={this.tabSelected}/>
        </header>
        <div>
          {content}
        </div>
      </div>
    );
  }
}



export default App;
