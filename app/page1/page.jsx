"use client";

import React, { Component } from 'react';

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      isClient: false,
    };
  }

  componentDidMount() {
    this.setState({ 
      time: new Date().toLocaleTimeString(),
      isClient: true 
    });
    this.intervalID = setInterval(() => this.updateTime(), 1000);

    // Dynamically create and append the script
    const script = document.createElement("script");
    script.src = "https://cdn.logwork.com/widget/clock.js";
    script.async = true;
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateTime() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {this.state.isClient && (
          <a href="https://logwork.com/current-time-in-quezon-city-philippines-quezon" className="clock-time" data-style="default-numeral" data-size="250" data-timezone="Asia/Manila">
            Current time in Quezon City, Philippines
          </a>
        )}
        {this.state.isClient && <h1 className="text-4xl">{this.state.time}</h1>}
      </div>
    );
  }
}

export default Page1;