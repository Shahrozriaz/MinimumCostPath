
import React, { useEffect, useMemo, useState, useRef } from "react";



function App() {

  /* ==== Data  ===== */

  const airports = [
    {
      start: 'ISB',
      end: 'LHR',
      cost: 1000
    },
    {
      start: 'LHR',
      end: 'NYC',
      cost: 750
    },
    {
      start: 'CBS',
      end: 'NYC',
      cost: 775
    },
    {
      start: 'ISB',
      end: 'CBS',
      cost: 575
    },
    {
      start: 'CBS',
      end: 'GRC',
      cost: 731
    },
    {
      start: 'NYC',
      end: 'GRC',
      cost: 459
    }
  ]


  /* ==== initialize Hook's  ===== */

  const [startVal, setstart] = useState("");
  const [endVal, setend] = useState("");
  const [error, seterror] = useState("");
  const [cost, setcost] = useState(0);
  const [path, setpath] = useState([]);


  /* ==== Minimum Path Search  ===== */

  const SearchPath = ( ) => {
  
  /* ==== initialize some array  ===== */
    
    var Possible = []
    var cost = []
    var Path = []
    
  /* ==== Change Input A/C to Data  ===== */

    let start = startVal.toUpperCase();
    let End = endVal.toUpperCase() ; 

   
  /* ==== Analysis the Requriment And Collect Data  ===== */
  
    var FilterStart =  airports.filter( Val => Val.start == start )
    var FilterEnd =  airports.filter( Val => Val.end == End )

  /* ==== Find All Possible Path  ===== */

    FilterStart.map( Val => { 
      var FilPossible = FilterEnd.filter(x =>  x.start == Val.end)
      if(FilPossible.length > 0){
        let cars = new Array( Val, FilPossible[0]);
        Possible.push(cars); 
      }
   })

   console.log("Possible" , Possible )

  /* ==== Find Cost of all Path ===== */

   Possible.map( Val => {
     let Currcost = 0 ;
     Val.map( x => {
        Currcost =  Currcost + x.cost
     })
     cost.push(Currcost)
     console.log("Val" , Val)
     console.log("cost" , cost)
   })

  /* ==== Error Handling  ===== */

   if(cost.length > 0){
     
  /* ==== Find Minimum Cost   ===== */

     var MininmumCost = Math.min(...cost)
     console.log("MininmumCost" , MininmumCost)
  
     var Index = cost.findIndex( Val => Val == MininmumCost)
     console.log("Index" , Index)
  
     if( Index != -1){
      var MinimumObj = Possible[Index]
      console.log("MinimumObj" , MinimumObj)
   
  /* ==== Generate Output A/C to requriments  ===== */

      MinimumObj.map(( Val , key ) => {
        if( key == 0){
           Path.push( Val.start , Val.end )
        }
        else{
         Path.push( Val.end )
        }
      })
     }
    }

    else{
  /* ==== Set Error Msg  ===== */
      
      seterror("Something went Wrong")

  /* ==== Destory Msg afer 1.2 s ===== */

      setTimeout(() => {
      seterror("")
      }, 1200);
    }

   setcost(MininmumCost)
   setpath(Path)

  }

  return (
 <div className="row mt-5">
   <div className="border col-lg-4 offset-4 p-5">
     <div className="row mb-2">
   <input onChange={ (e) => setstart(e.target.value)} 
          class="form-control form-control-sm" 
          type="text" 
          placeholder="Start"
          maxLength="3"
           />

     </div>
     <div className="row mb-2">
   <input onChange={ (e) => setend(e.target.value)} 
          class="form-control form-control-sm" 
          type="text" 
          placeholder="End"
          maxLength="3"
          />

     </div>
     <div className="row mb-2 justify-content-center">
     <button type="button" class="btn btn-secondary w-50" onClick={SearchPath}>Calculate Path</button>
     </div>

     <div className="row">
      <label>Minimum Cost : {cost}</label>
     </div>
     <div className="row">
      <label>Path : {path?.map( Val => <span>{Val} , </span>)}</label>
     </div>
    
      {error != "" ?   <div class="row alert alert-danger" role="alert">{error}</div> : ""}
     
   </div>
 </div>


  
    
  );
}

export default App;
