
import React, { useEffect, useState } from 'react'
import "./style.css"

import ResturentBody from './Body/ResturentBody'
import ResturentMenu from './Menu/ResturentMenu'

import ShowMoreAboutBtn from './showMoreAboutBtn/ShowMoreAboutBtn'

// import foodItemsApi from "./foodItemsAPI"
import Modal from '../Modal/Modal'

// // // <======================= Main Componant ===============================>
const ResturentMain = ({ foodCat, menuList, items, findFood }) => {

  // const [allDataOfApi, setAllDataOfApi] = useState([[],[]])

  // const [items, setItems] = useState(allDataOfApi[0])

  // const [menuList, setmenuList] = useState([])

  // const [foodCat, setFoodCat] = useState(allDataOfApi[1])



  // // // Below both is used in show more data button clicked ---------->

  // const [showMoreAboutBtn, setShowMoreAboutBtn] = useState(false)

  const [showMoreAboutData, setShowMoreAboutData] = useState("")


  const [viewModalShowMore, setViewModalShowMore] = useState(false)


  /**
   * All Improtant function and state var , now in app.js because i don't want to reload data at every endpoint change.
  */
  // // // To see all category of list 
  // const allListOfCategory = [ ...new Set(allDataOfApi[0].map((item) => {
  //   return item.category
  // })) , "All"
  // ]
  // // // In above line running map in a set object to get unique data only.(using spread operator also)
  // console.log(allListOfCategory)  // // Getting all unique data that is set 
  // // // // Below function is used in show item by category ----->
  // const findFood = (category) => {
  //   if (category === "All") {
  //     return setItems(allDataOfApi[0])
  //   }

  //   // // // In below line apply filter on Api file (becz api file is a arr so we can use filter over there)
  //   const searchByMenu = allDataOfApi[0].filter((curEle) => {
  //     return curEle.category === category
  //   })

  //   setItems(searchByMenu)
  // }



  // const switchNow = false
  // // // Below function is used to hold data of clicked item ------------>

  function dataOfShowMoreAbout(value) {
    let inStr = JSON.stringify(value)

    setShowMoreAboutData(inStr)
    return value
  }
  // async function loadData() {
  //   // alert("ok Called")

  //   let options = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   let loadFoodData = await fetch("https://get-food-mern-backend.onrender.com/getfoodData", options)
  //   let data = await loadFoodData.json()

  //   if (data.status === false) {
  //     return alert(data.message)
  //   }



  //   if (data.status === true) {
  //     setAllDataOfApi(data.data)
  //     setItems(data.data[0])
  //     setFoodCat(data.data[1])

  //     // // // Below is used for menu (very first horizontal)
  //     const allListOfCategory = [...new Set(data.data[0].map((item) => {
  //       return item.category
  //     })), "All"
  //     ]

  //     setmenuList(allListOfCategory)
  //   }

  // }


  // useEffect(() => {
  //   loadData()
  // }, [])




  return (
    <div id='resturentId' className=' min-vh-100 p-3 d-flex flex-column align-items-center'>


      {/* Expperiment duing here ---------------> */}

      {
        <ResturentMenu findFood={findFood} menuList={menuList} />
      }

      {

        <ResturentBody
          items={items}
          setShowMoreAboutBtn={setViewModalShowMore}
          dataOfShowMoreAbout={dataOfShowMoreAbout}
          foodCat={foodCat}
        />

      }



      {/* Now show more used as portal div --->  */}

      {
        viewModalShowMore
        &&
        <Modal onClose={() => { setViewModalShowMore(false) }} title="About Food" Div="showMore">

          <ShowMoreAboutBtn
            showMoreAboutData={showMoreAboutData}
          />
        </Modal>
      }



    </div>
  )
}

export default ResturentMain