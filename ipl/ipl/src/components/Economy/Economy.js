import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import Spinner from "../../UI/spinner/Spinner"
import "./Economy.css"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

class Chart extends React.Component {
   state = {
      player_names: [],
      bowling_eco: [],
      year: 2008,
      loading: false
   }
   currentYear = (e) => {
      this.setState({ year: e.target.value })

   }
   getApiData = () => {
      this.setState({ loading: true })
      axios.get("https://leagueipl-default-rtdb.firebaseio.com/" + this.state.year + ".json")
         .then((response) => {
            


            let bowlersarray = Array.from(new Set(response.data.map(el => el.bowler))).sort()

            let overs = []
            let runs = []
            let economy = []
            for (let i of bowlersarray) {

               overs.push(response.data.filter(el => el.bowler == i).length)
               let temp = response.data.filter(el => el.bowler == i)
               runs.push(temp.map(el => el.total_runs).reduce(function (acc, el) { return acc + el }, 0))
            }

            economy = runs.map((el, id) => parseFloat((el / (overs[id] / 6)).toFixed(2)))

            let players_economy = bowlersarray.map((el, id) => [el, economy[id]])
            players_economy.sort((a, b) => a[1] - b[1])
            players_economy = players_economy.slice(0, 10)

            this.setState({ player_names: players_economy.map(el => el[0]), bowling_eco: players_economy.map(el => el[1]), loading: false })

         }


         ).catch(err => console.log(err))


   }
   componentDidMount() {
      this.getApiData()

   }
   componentDidUpdate(nxtProps, nxtState) {
      if (this.state.year !== nxtState.year) {
         this.getApiData()
      }

   }


   render() {
      let local = localStorage.getItem("year").split(",").map(el => +el)
      let highdata = {
         chart: {
            type: 'column'
         },

         title: {
            text: 'Best Economy Rates',
            style: {
               color: "rgb(46, 42, 42)",
               fontWeight: 570
            }
         },
         subtitle: {
            text: 'Source: Kaggle IPL Data Sheet'
         },
         xAxis: {
            categories: this.state.player_names,
            crosshair: true
         },
         yAxis: {
            lineWidth: 1,
            tickAmount: 8,

            min: 0,
            title: {
               text: "Economy Rate",

            }
         },
         tooltip: {



         },


         plotOptions: {
            column: {
               pointPadding: 0,


            }
         },
         series: [{
            name: 'Economy',


            data: this.state.bowling_eco,

            color: 'rgba(165, 221, 34,0.5)',
            borderColor: 'rgba(165, 221, 34,1)',
            borderWidth: 1

         }]
      }





      return (

         <React.Fragment>
            <div className="container economy border mt-5">

               <label className="label mr-1" for="select"> Select Year</label>


               <select id="select" onClick={this.currentYear} onChange={this.currentYear}>
                  {local.map(el => {
                     return (
                        <option value={el}> {el} </option>
                     )
                  })}
               </select>


               <div className="chart"><HighchartsReact
                  highcharts={Highcharts}
                  options={highdata}></HighchartsReact></div>
               <div className="spin ">{this.state.loading ? <Spinner></Spinner> : null}</div>


            </div>

         </React.Fragment>
      )



   }
}
const mapStateToProps = (state) => {
   return (
      {
         totalYears: state.totalYears
      }
   )
}
export default connect(mapStateToProps)(Chart)