let initialState={
   totalYears:[]
}

const reducer=(state=initialState,action)=>{
   if(action.type=="getYears"){
      return(
         {...state,
         totalYears:action.data}
      )
   }
   return state


}
export default reducer