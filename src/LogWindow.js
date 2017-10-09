import React, { Component } from 'react'
import './LogWindow.css'

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
        console.log(data)
        this.setState({
          data,
          lastUpdate: new Date()
        })
      })
  }

  componentDidMount = () => {
    window.setInterval(this.getData, 1000);
  }

  renderEntry = (entry) => {
    var date = new Date(entry.timestamp);
    return (
      <tr className="entry">
        <td className="message">
          {entry.message}
        </td>
        <td className="tag">
          <i>{entry.tag}</i>
        </td>
        <td className="level">
          <small>{entry.level}</small>
        </td>
        <td className="date">
          {/* <small>{date.toString()}</small> */}
        </td>
      </tr>

    )
  }

  render() {
    if (!this.state.data)
      return "Loading log...";

    var entries = Object.keys(this.state.data).map(key => {
      return this.state.data[key];
    })

    entries = entries.sort((a, b) => a.timestamp - b.timestamp);

    return (
      <div className="log">
        <table>
          <thead>
            <tr>
              <th align="left">Message</th>
              <th align="left">Tag</th>
              <th align="left">Level</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(this.renderEntry)}
          </tbody>
        </table>
        <p>Last update: {this.state.lastUpdate.toString()} </p>
    </div>
    );
  }
}

export default LogWindow;