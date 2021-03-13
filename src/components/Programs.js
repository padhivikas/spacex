import React from 'react'




function Programs(props) {

   const data =props.launch


    return (
        <div className="item">
                <div className="card">
                    <div className="img-holder">
                        <img src={data.links.mission_patch_small} className="cardimg" alt="" />
                    </div>
                    <div>
                        <h2 className="card-title">{data.mission_name}#{data.flight_number}</h2>
                    </div>
                    <div>
                        <p className="data-title">Mission Ids</p>
                        <ul>
                            {
                                data.mission_id.map((item)=>{
                                   return <li className="data-value">{item}</li>    
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        <span className="data-title">Launch Year:</span> <span className="data-value">{data.launch_year}</span>
                    </div>
                    <div>
                        <span className="data-title">Successful Launch:</span> <span className="data-value">{data.launch_success?"true":"false"}</span>
                    </div>
                    <div>
                        <span className="data-title">Successful Landing:</span> <span className="data-value">{data.rocket.first_stage.cores[0].land_success ? "true":"false"}</span>
                    </div>
                </div>
            </div>
    )
}

export default Programs
