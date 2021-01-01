import React from "react"
import "./Layout.css"
import Navbar from "../navbar/navbar"
import {Redirect} from "react-router-dom"

class Layout extends React.Component {
   render() {
      return (
         <React.Fragment>
            <div className="container-fluid  px-0">
            
               <Navbar></Navbar>
               <main>
                  {
                     this.props.children
                  }
               </main>


            </div>

         </React.Fragment>


      )
   }
}
export default Layout