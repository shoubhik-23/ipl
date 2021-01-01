import React from "react"
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from "./components/layout/Layout"
import First from "../src/components/LandingPage/First/First"
import Second from "../src/components/LandingPage/Second/Second"
import Economy from "../src/components/Economy/Economy"
import { Route,Redirect } from "react-router-dom"
import Runs from "../src/components/Runs/Runs"
import Wins from "./components/Wons/Wins"
import About from "../src/components/About/About"
class App extends React.Component {


  render() {

    return (
      <React.Fragment>
        <div className="container-fluid  px-0">
          <Layout>
            <Route exact path="/" component={First}></Route>
        <Route exact path="/" component={Second}></Route>
        <Route path="/economy" component={Economy}></Route>
        <Route path="/runs" component={Runs}></Route>
        <Route path="/wins" component={Wins}></Route>
        <Route path="/about" component={About}></Route>

          </Layout>


        </div>



      </React.Fragment>
    )
  }
}



export default App;
