import React, {Component} from "react";
import ReactDOM from "react-dom";
import Components from './components'
import './main.css';

class App extends Component {
  render() {
    return <Components/>;
  }
}
ReactDOM.render(<App/>, document.querySelector("#root"));


export default App;
