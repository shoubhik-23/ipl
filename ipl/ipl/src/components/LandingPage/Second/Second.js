import React from "react"
import "./Second.css"
import axios from "axios"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

class Second extends React.Component {
   state = {
      totalyears: [],
      currentyear: 2008,
      team_scores: [],
      finalteams: []

   }



   selectyear = (event) => {
      console.log(event.target.value)
      this.setState({ currentyear: event.target.value })

   }

   componentDidMount() {
      let teams = []
      let stringteam = []

      axios.get("https://leagueipl-default-rtdb.firebaseio.com/matches.json")
         .then((response) => {

            for (let i in response.data) {
               teams.push(response.data[i])
            }
            teams = teams.map((el) => {
               return (
                  el.map(e => e.team1)
               )
            })
            for (let i of teams) {
               for (let j of i) {
                  stringteam.push(j)
               }
            }
            let finalteams = Array.from(new Set(stringteam)).sort()

            let wins = []
            this.setState({ finalteams: finalteams })
            for (let i in response.data) {

               for (let j of finalteams) {
                  wins.push([i, j, response.data[i].filter(el => el.winner == j).length])


               }



            }


            this.setState({ totalyears: Object.keys(response.data), team_scores: wins })
         })





   }



   render() {
      let series = []
      for (let i of this.state.totalyears) {
         series.push({ name: i, data: this.state.team_scores.filter((el) => el[0] == i).map(el => el[2]) })
      }

      let chartdata = {
         chart: {
            type: 'bar'
         },
         title: {
            text: 'No of Wins for Each Team',
            style: {
               color: "rgb(46, 42, 42)",
               fontWeight: 570
            }
         },
         xAxis: {
            categories: this.state.finalteams
         },
         yAxis: {
            min: 0,
            title: {
               text: 'Total wins'
            }
         },
         legend: {
            reversed: true
         },
         plotOptions: {
            series: {
               stacking: 'normal'
            }
         },
         series: series
      }
      return (
         <React.Fragment>
            <div className="container second  border ">
               <HighchartsReact
                  highcharts={Highcharts}
                  options={chartdata}>
               </HighchartsReact>


            </div>

         </React.Fragment>
      )
   }


}
export default Second