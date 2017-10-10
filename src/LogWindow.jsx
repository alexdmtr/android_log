import React, { Component } from 'react'
import './LogWindow.css'

class LogWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      lastUpdate: null,
      error: null
    }
  }

  getData = () => {
    const URL = `${this.props.url}?orderBy=%22timestamp%22&startAt=60`;

    fetch(URL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          data,
          lastUpdate: new Date(),
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err
        })
      })
  }

  componentDidMount = () => {
    window.setInterval(this.getData, 1000);
  }

  renderEntry = (entry) => {
    var date = new Date(entry.timestamp);

    var dateString = ((date) => {
      let now = new Date();

      let hours = (now - date) / 1000 / 3600;
      
      if (hours >= 0 && hours <= 24) {
        return `${date.getHours()}:${date.getMinutes()}`;
      }
      else {
        return date.toDateString();
      }
    })(date);
    return (
      <tr className="entry">
        <td className="message tooltip">
          <span className="tooltiptext">
            {'Key: ' + entry.id}
          </span>
          {entry.message}
        </td>
        <td className="tag">
          <i>{entry.tag}</i>
        </td>
        <td className="level">
          <small>{entry.level}</small>
        </td>
        <td className="date tooltip">
          <span className="tooltiptext">
            {date.toLocaleDateString() + " " + date.toTimeString()}
          </span>
          {<small>{dateString}</small>}
        </td>
      </tr>

    )
  }

  render() {
    if (!this.state.data)
      return "Loading log...";
    if (this.state.error)
      return "Error loading data.";

    var entries = Object.keys(this.state.data).map(key => {
      return {
        ...this.state.data[key],
        id: key
      }
    })

    entries = entries.filter(entry => {
      let date = new Date(entry.timestamp);
      let now = new Date();

      let difference = (now - date) / 1000 / 3600;
      if (this.props.showFrom === 'today') {
        return difference <= 24;
      } 
      else if (this.props.showFrom === 'hour') {
        return difference <= 1;
      }
      else
        return true;
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
              <th align="left">Time</th>
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