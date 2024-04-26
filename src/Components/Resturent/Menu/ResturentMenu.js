import React from 'react'

// import foodItems from "../foodItemsAPI"




// // // Menu Section starts here ------------------------->
const ResturentMenu = ({ findFood, menuList }) => {


    return (
        <>
            <div id='navBarAk' className=' border border-success border-3 rounded rounded-pill px-4 py-2'>

                <ul className="nav nav-tabs justify-content-center">

                    <li className="nav-item" onClick={() => { findFood("All") }} >
                        <a className="nav-link active" aria-current="page" href="#">All</a>
                    </li>

                    {/* Two all coming becz left from li tag and right from in unique list  */}

                    {
                        (menuList.length !== 0)
                            ?
                            menuList.map((item, i) => {
                                return (
                                    <li className="nav-item" onClick={() => { findFood(item) }} key={i} >
                                        <a className="nav-link text-warning fw-bold" href="#">{item}</a>
                                    </li>
                                )

                            })

                            :
                            <ul className="nav nav-tabs justify-content-center">
                                <li className="nav-item" >
                                    <a className="nav-link text-warning fw-bold" href="#">I<sub>st</sub></a>
                                </li>
                                <li className="nav-item"  >
                                    <a className="nav-link text-warning fw-bold" href="#">II<sub>nd</sub></a>
                                </li>
                                <li className="nav-item"  >
                                    <a className="nav-link text-warning fw-bold" href="#">III<sub>rd</sub></a>
                                </li>
                            </ul>
                    }
                    
                </ul>

            </div>


        </>
    )
}

export default ResturentMenu