import React from "react"
import "./Runs.css"
import axios from "axios"
import { connect } from "react-redux"

import Spinner from "../../UI/spinner/Spinner"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
class Runs extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         teams: [],
         runs: [],
         year: 2008,
         loading: false
      }
   }
   currentYear = (e) => {
      this.setState({ year: e.target.value })
   }
   getApiData = () => {
      this.setState({ loading: true })
      axios.get("https://leagueipl-default-rtdb.firebaseio.com/" + this.state.year + ".json")
         .then((response => {

            let teams = Array.from(new Set(response.data.map(el => el.bowling_team))).sort()

            let runs = []
            let teamruns = []
            for (let i of teams) {
               runs.push(response.data.filter(el => el.bowling_team == i).map(el => el.extra_runs).reduce((acc, el) => acc + el, 0))

            }

            teamruns = teams.map((el, id) => [el, runs[id]])

            this.setState({ teams: teamruns.map(el => el[0]), runs: teamruns.map(el => el[1]), loading: false })

         }))
         .catch(err => console.log(err))

   }

   componentDidMount() {
      this.getApiData()
   }
   componentDidUpdate(nxtProps, nxtStates) {
      if (this.state.year !== nxtStates.year) {
         this.getApiData()
      }

   }

   render() {
      console.log(this.state)

      let highdata = {
         chart: {
            type: 'column'
         },
         title: {
            text: 'Extra Runs Conceded By Every Team ',
            style: {
               color: "rgb(46, 42, 42)",
               fontWeight: 570
            }
         },
         subtitle: {
            text: 'Source:Kaggle IPL Data Sheet'
         },
         xAxis: {
            categories: this.state.teams,
            crosshair: true
         },
         yAxis: {
            lineWidth: 1,
            tickAmount: 8,

            min: 0,
            title: {
               text: "Runs"
            }
         },
         tooltip: {

         },


         plotOptions: {
            column: {
               pointPadding: 0,
               borderWidth: 0

            }
         },
         series: [{
            name: 'Extras',

            data: this.state.runs,
            color: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1

         }]
      }
      let local = localStorage.getItem("year").split(",").map(el => +el)

      return (
         <React.Fragment>
            <div className="container mt-5 runs border">


               <label className="mr-1" for="select"> Select Year</label>
               <select id="select" onClick={this.currentYear} id="select">
                  {local.map(el => {
                     return (
                        <option value={el}>{el}</option>
                     )
                  })}
               </select>

               <div className="chart"><HighchartsReact highcharts={Highcharts} options={highdata}></HighchartsReact></div>
               <div className="spin">{this.state.loading ? <Spinner></Spinner> : null}</div>

            </div>

         </React.Fragment>
      )
   }


}
const mapStateToProps = (state) => {
   return ({
      years: state.totalYears
   })
}
export default connect(mapStateToProps)(Runs)