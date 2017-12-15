import React, { Component } from 'react';
import './App.css';
import ContactForm from './components/ContactForm'
import Menu from './components/OverHeadMenu'
import Graphs from './components/Graphs'
import ScenarioSelector from './components/ScenarioSelector'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataGetter from './data/getData'
import IndicatorChooser from './components/IndicatorChooser'

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
      selectedTimePeriod:null,
      selectedIndicators: []
    }

    this.tabSelected = this.tabSelected.bind(this);
    this.saveSelectedRegionLevel = this.saveSelectedRegionLevel.bind(this);
    this.saveSelectedRegion = this.saveSelectedRegion.bind(this);
    this.saveRegions = this.saveRegions.bind(this);
    this.saveRegionLevels = this.saveRegionLevels.bind(this);
    this.saveSelectedScenarioCollection = this.saveSelectedScenarioCollection.bind(this);
    this.setSelectedScenarios = this.setSelectedScenarios.bind(this);
    this.setSelectedTimePeriod = this.setSelectedTimePeriod.bind(this);
    this.setIndicatorsSelected = this.setIndicatorsSelected.bind(this);
    this.setIndicatorDefaults = this.setIndicatorDefaults.bind(this);
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
        if (this.state.selectedScenarioCollection!==nextState.selectedScenarioCollection
            || this.state.selectedRegion!==nextState.selectedRegion) {
          DataGetter.getScenarioCollectionById(nextState.selectedRegion,nextState.selectedScenarioCollection)
          .then(result => {
            this.setState({scenarioCollection:result});

            // set indicator defaults:
            

            // remove indicators that don't exist in new scenario collection when changing scenario collection
            let tempArrayForIndicators = [];
            this.state.scenarioCollection[0].indicatorCategories.forEach(element => {
              element.indicators.forEach(secondElement => {
                tempArrayForIndicators = [...tempArrayForIndicators, secondElement.id];  
              });
            });
      
            let tempArrayForSelectedIndicators = this.state.selectedIndicators;
            let anotherNewArray = [];
          
            tempArrayForSelectedIndicators.forEach(secondElement => {
                if ( tempArrayForIndicators.includes(secondElement)) {
                  anotherNewArray = [...anotherNewArray, secondElement]; 
                }
              });
            this.setState({ selectedIndicators: anotherNewArray });
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

  setIndicatorsSelected(itemId) {
    this.setState({selectedIndicators: itemId})  
  }

  setIndicatorDefaults() {
    
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
                  selectedScenarios:[],
                  selectedIndicators: [],
                  selectedIndicatorCategories: []
                });
  }
  
  saveSelectedRegion(regionId){
    /*
    this.setState({selectedRegion:regionId,
                  selectedScenarioCollection: null,
                  scenarioCollection:null,
                  selectedTimePeriod:null,
                  selectedScenarios:[]});
  */
    this.setState((state, props) => { 
      let selectedScenarioCollection=null;
      let scenarioCollection=null;
      let selectedTimePeriod=null;
      let selectedScenarios=[];
      const indexOfRegion = state.regions.findIndex(element=>element.id===regionId);


      /*
      check if newly selected region contains same scenario collection
      if yes then keep previous selections
      if not set to defaults
      */
      selectedScenarioCollection = (state.regions[indexOfRegion].scenarioCollections
        .find(element => element.id===state.selectedScenarioCollection)) != null
        ?state.selectedScenarioCollection:null;

      if (selectedScenarioCollection!=null) {
        selectedTimePeriod=state.selectedTimePeriod;
        selectedScenarios=state.selectedScenarios;
        scenarioCollection=state.scenarioCollection;
      } else {
        //TODO: set to defaults
      }



      return {
       selectedRegion: regionId,
       selectedScenarioCollection,
       scenarioCollection,
       selectedTimePeriod,
       selectedScenarios
     
      }});
    
                
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
          <div className="App-content">THIS IS LANDING PAGE</div>
        )
        break;
        
      case "APP":
        content = (
          <div className="App-content">
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
            selectedTimePeriod={this.state.selectedTimePeriod}/>

            <Graphs
              selectedIndicators = {this.state.selectedIndicators}
              selectedScenarios = {this.state.selectedScenarios}
              scenarioCollection = {this.state.scenarioCollection}
              selectedTimePeriod = {this.state.selectedTimePeriod}
               
              />

            <IndicatorChooser
          setIndicatorsSelected = { this.setIndicatorsSelected }
          scenarioCollection = { this.state.scenarioCollection }
          selectedIndicators = { this.state.selectedIndicators  }
          setIndicatorDefaults = {this.setIndicatorDefaults}
          />
          </div>
        )
      break;
      case "Contact":
      content = (
		<div className="App-content"><ContactForm /></div>
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
