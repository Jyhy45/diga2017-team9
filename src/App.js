import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/OverHeadMenu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedTab: "Landing Page"

    }
    this.tabSelected = this.tabSelected.bind(this);
  }

tabSelected(tabName){
  this.setState({selectedTab: tabName});
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Menu
          selectedTab = {this.state.selectedTab}
          tabSelected={this.tabSelected}/>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
