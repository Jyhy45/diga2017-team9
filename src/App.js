import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/OverHeadMenu'
import IndicatorChooser from './components/IndicatorChooser'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedTab: "Landing_Page",
      selectedRegion: null,
    }

    this.tabSelected = this.tabSelected.bind(this);
    this.indicatorSelected = this.indicatorSelected.bind(this);
  }

  indicatorSelected(itemId) {
    console.log("indicatorSelected()", itemId);
  }

  tabSelected(tabName){
    this.setState({selectedTab: tabName});
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
          <div><IndicatorChooser
          indicatorSelected = { this.indicatorSelected }/></div>
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
