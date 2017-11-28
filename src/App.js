import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm'
import Menu from './components/OverHeadMenu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedTab: "Landing_Page"

    }
    this.tabSelected = this.tabSelected.bind(this);
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
          <div>THIS IS APP PAGE</div>
        )
      break;
      case "Contact":
      content = (
		<div><ContactForm /></div>
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
