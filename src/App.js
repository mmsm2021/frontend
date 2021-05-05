import logo from './logo.svg';
import './App.css';
import React from "react";
import "./Container.css";
class Container extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      company: undefined
    }
  }
  render() {
    return(
        <div className="c-main">
          <h1>{this.props.company}</h1>
        </div>
    )
  }
}
function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container company="Café Crystal Methodic" />
      </header>

    </div>

  );
}

export default App;
