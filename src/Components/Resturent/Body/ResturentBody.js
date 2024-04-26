import React, { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'


import Card from '../card/card'


import Skeleton from '../../skeleton/Skeleton'

const ResturentBody = ({ items, setShowMoreAboutBtn, dataOfShowMoreAbout, foodCat }) => {

  // const [foodCat, setFoodCat] = useState([foodItemApi])

  // Below useState for show more button           
  // const [showMoreDes, setShowMoreDes] = useState(false)

  // const [ itemsMain , setItemsMain ]=useState(null);
  // console.log(items)







  return (

    <div className='min-vh-100  d-flex justify-content-center ' id='mainHolderOfAll'  >


      {/* Main Div for Cards */}
      <div className='container '>

        <div className="row d-flex flex-wrap align-items-start darkCardHolderAk">

          {
            (foodCat.length !== 0) ? foodCat.map((element, i) => {
              return (
                <div key={i} className="mt-5 mb-0" >
                  <div >
                    <p className='text-warning fs-3'>{element.subcategory.toUpperCase() || "Category"}</p>
                    <hr className='text-warning' />
                  </div>
                  {
                    (items.length !== 0)
                      ?
                      items.filter((data, i) => {
                        if ((data.subcategory === element.subcategory) && true) {
                          return data
                        }
                      }).map((curEle, i) => {
                        return (
                          <Card data={curEle} index={i} key={i} dataOfShowMoreAbout={dataOfShowMoreAbout} setShowMoreAboutBtn={setShowMoreAboutBtn} />
                        )
                      })

                      :

                      <div>
                        <h1>Data not found</h1>
                        <Skeleton />
                      </div>
                  }
                </div>
              )

            })

              :

              <div>
                <p className='text-warning fs-3 mt-4'>LOADING DATA...</p>
                <p className='mt-2'>*Please Refresh Page, if not getting data after long time (max 10 seconds).</p>
                <p className='mt-0'>*Please Refresh Page, Twice or Thrice if not getting actual data.</p>
                <hr />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <p className='mt-3'>*Data is loading or check your data (May be slow) </p>
                <p className='mt-3'>*Some time it give undefind error , then please Refresh the page</p>
                <p className='mt-2'>*For Developer :- Backend server is stopped or crashed.</p>
              </div>

          }
        </div>

        <Link className="btn btn-success fw-bold position-absolute end-0 mx-sm-5" to={"/feed"}>GoTo Feedback Section</Link>
      </div>

    </div>
  )
}

export default ResturentBody
