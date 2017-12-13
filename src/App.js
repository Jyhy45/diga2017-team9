import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm'
import Menu from './components/OverHeadMenu'
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
      selectedIndicatorCategories: [],
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
  }

  setIndicatorsSelected(categoryId, itemId) {
    /*
      In this function we create a new array with an object with two values,
      that we get when button is clicked (categoryId and an array with all enabled itemIds).
      We check check if pre-existing array with these same objects has same categoryId as
      our new array.
      If so, then we filter these values out and merge these two arrays with the new values.
      Then we go trough all values in the merged array and pick out the itemIds into another new array.
    */
    let newArray = {
      categoryId,
      itemId
    }

    let tempArray = this.state.selectedIndicatorCategories.filter(element => 
      element.categoryId !== categoryId );

    tempArray = [...tempArray, newArray];
    
    let newTempArray = [];
    
    tempArray.forEach(element => {
      element.itemId.forEach(secondElement => {
        newTempArray = [...newTempArray, secondElement];
      });
    });

    this.setState({selectedIndicatorCategories: tempArray,
                  selectedIndicators: newTempArray});  
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
              
                    let tempArrayForCategoryIds = [];
                    let tempArrayForIndicators = [];
                    this.state.scenarioCollection[0].indicatorCategories.forEach(element => {
                      tempArrayForCategoryIds = [...tempArrayForCategoryIds, element.id];
                      element.indicators.forEach(secondElement => {
                        tempArrayForIndicators = [...tempArrayForIndicators, secondElement.id];  
                      });
                    });
              
                    // Arrays of all possible ids tempArrayForCategoryIds, tempArrayForIndicators.
              
                    let tempArrayForEverything = this.state.selectedIndicatorCategories;
                    let newArray = [];
                    let anotherNewArray = [];
                    
                    let anotherTempArrayForIndicatorCategories = [];
                    tempArrayForEverything.forEach(element => {
                      if( tempArrayForCategoryIds.includes(element.categoryId) ) {
                        newArray = [...newArray, element.categoryId];
                        let tempArrayForIndicatorCategories = {};
                        tempArrayForIndicatorCategories.categoryId = element.categoryId;
                      
                      let thirdTempArray = [];
                      element.itemId.forEach(secondElement => {
                        
                        if ( tempArrayForIndicators.includes(secondElement)) {
                          anotherNewArray = [...anotherNewArray, secondElement];
                          thirdTempArray = [...thirdTempArray, secondElement];
                          
                        }
                        tempArrayForIndicatorCategories.itemId = thirdTempArray;
                        
                      });
                      anotherTempArrayForIndicatorCategories = [...anotherTempArrayForIndicatorCategories, tempArrayForIndicatorCategories];
                      console.log(tempArrayForIndicatorCategories, anotherTempArrayForIndicatorCategories)
                    }
                    });
                    // Below are the arrays with the wanted results.
                    this.setState({selectedIndicatorCategories: anotherTempArrayForIndicatorCategories,
                       selectedIndicators: anotherNewArray});
                  
            console.log(this.state.selectedIndicators)
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
                  selectedScenarios:[],
                  selectedIndicators: [],
                  selectedIndicatorCategories: []
                });
  }
  
  saveSelectedRegion(regionId){
    this.setState({selectedRegion:regionId,
                  selectedScenarioCollection: null,
                  scenarioCollection:null,
                  selectedTimePeriod:null,
                  selectedScenarios:[],
                  selectedIndicators: [],
                  selectedIndicatorCategories: []
                });
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
            selectedTimePeriod={this.state.selectedTimePeriod}/>
            
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              PlaceHolder
            </div>
            
            <IndicatorChooser
          setIndicatorsSelected = { this.setIndicatorsSelected }
          scenarioCollection = { this.state.scenarioCollection }
          selectedIndicatorCategories = { this.selectedIndicatorCategories }
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
