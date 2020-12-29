import React, {Component} from "react";
import ReactDOM from "react-dom";
import Components from '../src/components'
import '../src/main.css';

class App extends Component {
    render() {
        return <Components/>;
    }
}
ReactDOM.render(<App/>, document.querySelector("#app"));



