export const getYears=(data)=>{
   localStorage.setItem("year",data)
   return({
      type:"getYears",
      data:data
   })
}