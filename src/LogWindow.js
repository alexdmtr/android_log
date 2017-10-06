import React, { Component } from 'react'

class LogWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      lastUpdate: null
    }
  }

  getData = () => {
    const URL = "https://log-project-8c7ef.firebaseio.com/logs.json?orderBy=%22timestamp%22&startAt=60";
    
    fetch(URL, {
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        data,
        lastUpdate: new Date()
      })
    })
  }

  componentDidMount = () => {
    window.setInterval(this.getData, 1000)
  }

  render() {
    if (!this.state.data) return null;

    var messages = Object.keys(this.state.data).map(key => {
      return this.state.data[key].message;
    })

    return (
    <div>
      {messages.map(text => <p>{text}</p>)}
      <p>Last update: {this.state.lastUpdate.toString()} </p>
    </div>
    );
  }
}

export default LogWindow;