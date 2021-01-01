import React from "react"
import "./First.css"
import { Bar } from "react-chartjs-2"
import axios from "axios"
import { connect } from "react-redux"
import * as act from "../../../store/Actions"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import Spinner from "../../../UI/spinner/Spinner"

class First extends React.Component {
   state = {
      totalyears: [],
      totalmatches: [],
      loading: false



   }
   componentDidMount() {
      this.setState({ loading: true })
      axios.get("https://leagueipl-default-rtdb.firebaseio.com/matches.json")
         .then((response) => {
            console.log(response.data)
            for (let i in response.data) {
               this.state.totalmatches.push(response.data[i].length)

            }
            
            this.setState({ totalyears: Object.keys(response.data), loading: false })
            this.props.getYears(this.state.totalyears)




         })
   }

   render() {
      

      let highdata = {
         chart: {
            type: 'column'
         },
         title: {
            text: 'Matches Played Over All Years of IPL',
            style: {
               color: "rgb(46, 42, 42)",
               fontWeight: 570
            }
         },
         subtitle: {
            text: 'Source:  Kaggle IPL Data Sheet'
         },
         xAxis: {
            categories: this.state.totalyears,
            crosshair: true
         },
         yAxis: {
            lineWidth: 1,
            tickAmount: 10,

            min: 0,
            title: {
               text: "Total no of matches"
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
            name: 'Matches Played',

            data: this.state.totalmatches,
            color: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1

         }]
      }

      return (
         <React.Fragment>
            <div className="container first mt-5 mb-5 border  ">

               <div className="chart"><HighchartsReact
                  highcharts={Highcharts}
                  options={highdata}></HighchartsReact></div>
               <div className="spinner"> {this.state.loading ? <Spinner></Spinner> : null}</div>



            </div>
         </React.Fragment>

      )
   }
}
const mapDispatchToProps = (dispatch) => {
   return ({
      getYears: (data) => dispatch(act.getYears(data))
   })
}

export default connect(null, mapDispatchToProps)(First)