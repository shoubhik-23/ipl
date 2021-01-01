import React from "react"
import "./About.css"
const About=()=>{
   return(
      <React.Fragment>
         <div
         className="container ">
            <h3 className="display-4 text-center mb-5 mt-2 ">About Section</h3>
            <hr></hr>
            <p> <strong>Build in Jan1, 2021.</strong>
            <br></br>
               The app displays the data of the IPL.
               Currently it displays the Extra Runs, Economy Rate, Rate of Win and total matches played

                The app is in beta version and new features are yet to be added.
                It is made solely for the purpose of practice.
                </p>
                <footer className="blockquote-footer text-right">Shoubhik</footer>
         </div>
      </React.Fragment>
   )

}
export default About