import React from "react"
import "./Wins.css"
import axios from "axios"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { connect } from "react-redux"
import Spinner from "../../UI/spinner/Spinner"



class Wons extends React.Component {

   state = {
      teamNames: [],
      wonPoints: [],
      year: 2008,
      loading: false,

      totalMatches: []
   }

   currentYear = (el) => {
      this.setState({ year: el.target.value })
   }

   findMostFrequent = (arr) => {
      let mf = 1;
      let m = 0;
      let item;

      for (let i = 0; i < arr.length; i++) {
         for (let j = i; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
               m++;
               if (m > mf) {
                  mf = m;
                  item = arr[i];
               }
            }
         }
         m = 0;
      }

      return item;
   }



   arrayTransform = (arr) => {
      let temp = []
      let counter = 0
      for (let i = 0; i < arr.length; i++) {
         if (arr[i] === 1) {
            counter = counter + 1
         }
         temp.push(counter)

      }
      return temp
   }
   getApiData = () => {
      this.setState({ loading: true })
      axios.get("https://leagueipl-default-rtdb.firebaseio.com/matches/" + this.state.year + ".json")
         .then(response => {

            let totalMatches = response.data.map(el => el.team1)
            totalMatches = totalMatches.concat(response.data.map(el => el.team2))
            console.log(totalMatches)

            let max = this.findMostFrequent(totalMatches)

            totalMatches = totalMatches.filter(el => el == max)

            totalMatches = totalMatches.map((el, id) => id + 1)
            for (let i = 0; i < 3; i++) {
               totalMatches.push(totalMatches[totalMatches.length - 1] + 1)
            }






            let totalTeams = Array.from(new Set(response.data.map(el => el.team1))).sort()

            let wonArray = []
            let playedArray = []

            for (let i of totalTeams) {
               playedArray.push(response.data.filter(el => el.team1 == i || el.team2 == i).map((el, id) => id + 1))
               wonArray.push(response.data.filter(el => el.team1 == i || el.team2 == i).map((el) => {
                  if (el.winner == i) { return 1 }
                  else return 0
               }))

            }



            wonArray = wonArray.map(el => this.arrayTransform(el))
            this.setState({ teamNames: totalTeams, wonPoints: wonArray, totalMatches: totalMatches, loading: false })



         })


   }
   componentDidMount() {
      this.getApiData()
   }
   componentDidUpdate(Props, States) {
      if (this.state.year != States.year) {
         this.getApiData()
      }
   }




   render() {



      let datasets = this.state.teamNames.map((el, id) => {
         return ({
            name: el,
            data: this.state.wonPoints[id]

         })
      })




      let data = {

         title: {
            text: 'Matches Played vs Won for Each Team',
            style: {
               color: "rgb(46, 42, 42)",
               fontWeight: 570
            }
         },

         subtitle: {
            text: 'Source: Kaggle IPL Data Sheet'
         },

         yAxis: {
            title: {
               text: 'Matches Won'
            }
         },

         xAxis: {
            accessibility: {
               rangeDescription: ""
            }
         },

         legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
         },

         plotOptions: {
            series: {
               label: {
                  connectorAllowed: false
               },
               pointStart: 1,

            }
         },

         series: datasets,

         responsive: {
            rules: [{
               condition: {
                  maxWidth: 500
               },
               chartOptions: {
                  legend: {
                     layout: 'horizontal',
                     align: 'center',
                     verticalAlign: 'bottom'
                  }
               }
            }]
         }

      }
      let local = localStorage.getItem("year").split(",").map(el => +el)
      return (

         <React.Fragment>
            <div className="container mt-5 wins border">
               <label className="label mr-1" for="select">Select Year</label>
               <select id="select" onClick={this.currentYear}>
                  {local.map(el => {
                     return (
                        <option value={el}>{el}</option>
                     )
                  })}
               </select>
               <div className="chart"><HighchartsReact
                  highcharts={Highcharts}
                  options={data}></HighchartsReact></div>
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
export default connect(mapStateToProps)(Wons)