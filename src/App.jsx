import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogWindow from './LogWindow';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: "https://log-project-8c7ef.firebaseio.com/logs.json",
      showFrom: "today"      
    }
  }

  onUrlChange = (event) => {
    this.setState({
      url: event.target.value,
    })
  }

  onShowFromChange = (event) => {
    this.setState({
      showFrom: event.target.value
    })
  }

  render() {
    return (
      <div>

        
        <label>Firebase URL: </label>
        <input type="text" onChange={this.onUrlChange} value={this.state.url} />

        <label>Show from: </label>
        <select onChange={this.onShowFromChange} value={this.state.showFrom} >
          <option value="start">The beginning of time</option>
          <option value="today">Today</option>
          <option value="hour">Last hour</option>
        </select>

        <LogWindow url={this.state.url} showFrom={this.state.showFrom} />
      </div>
    );
  }
}

export default App;
