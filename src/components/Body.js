import React , {useContext, useState , useEffect} from 'react'
import Filter from "./Filter";
import Programs from "./Programs"
import {launchContext} from '../App'

function Body() {
    
       const launches = useContext(launchContext)
       const [data,setData] = useState([])
       const [loading,setloading] = useState(true)

       
       

       
       useEffect(() => {
       
        setData(launches.launchData.programs) 
        setloading(false)
        
       })

    //    if(data)
    //    {
    //        setloading(false)
    //    }
    //    else{
    //        setloading(true)
    //    }
       
       console.log(loading)
    return (
        <div className="grid-container">
            <div className="grid-item">
                <Filter/>
            </div>
            <div className="grid-item programs">
                { loading === true? ( 
                    <>
                    <h1>Loading</h1>
                    </>
                ) :
                    (data.map((item)=>{
                        return   <Programs launch={item}/>
                    }))
                }
            </div>
        </div>
    )
}
export default Body
