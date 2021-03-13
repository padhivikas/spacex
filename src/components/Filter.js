import React ,{useContext,useState,useEffect} from 'react'
import {launchContext} from '../App'
import axios from 'axios'


function Filter() {

    const API_BASE_URL = `https://api.spacexdata.com/v3/launches?limit=100`

    const launches = useContext(launchContext)
    const [uniqueyears,setUniqueyears]=useState([])
    const [filterresult,setfilterresult] = useState([true,false])
    const [loading,setloading] = useState(true)

    const [filter,setfilter]=useState({})

    const setYear = (year)=>
    {
        launches.setyear(year)   
         
    }

    const setLaunch = (launch)=>
    {
        launches.setlaunch(launch)
    }

    const setLanding = (landing)=>
    {
        launches.setlanding(landing)
    }

    useEffect(() => {
        axios.get(API_BASE_URL)
        .then((res)=>{
            let years = res.data.map((item)=>{
                return item.launch_year
              })
              setUniqueyears([... new Set(years)])
              setfilter(launches.filter)
              setloading(false)
        })
        .catch(()=>{

        })
    },[launches])

    return (
        <div className="item">
                <div className="card">
                   <p>Filters</p>
                   <p className="filter_title">Launch Year</p>
                   <hr/>
                   <div className="filter">
                    { loading? (<><h1>Loading</h1></>):
                    (
                       uniqueyears.map((items)=>{
                           
                            
                               if(filter.launch_year==items)
                               {
                                   return <div><button className="filter_button" style={{backgroundColor:'#28a745',color:'white' }} onClick={()=>setYear(items)}>{items}</button></div>
                               }
                               else
                               {
                                return <div><button className="filter_button" onClick={()=>setYear(items)}>{items}</button></div>
                               }
                       }))
                    }
                        
                   </div>
                   <p className="filter_title">Successful Launch </p>
                   <hr/>
                   
                        <div className="filter">
                                <div>
                                    <button className="filter_button" onClick={()=>setLaunch(true)}>
                                        True
                                    </button>
                                </div> 
                                <div>
                                    <button className="filter_button" onClick={()=>setLaunch(false)}>
                                         False
                                    </button>
                                </div> 
                        </div>
                                                                   
                   <p className="filter_title">Successful Landing </p>
                   <hr/>
                   <div className="filter">
                    <div><button className="filter_button" onClick={()=>setLanding(true)}>True</button></div>
                    <div><button className="filter_button" onClick={()=>setLanding(false)}>False</button></div>
                   </div>
                </div>
            </div>
    )
}

export default Filter
