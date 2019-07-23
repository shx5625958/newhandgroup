import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return (
      <div>Hello, it is a demo!{window._env_.DEMO_TEST}</div>
    );
  }
}

export default Hello;