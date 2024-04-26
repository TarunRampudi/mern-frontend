import React, { useEffect, useState } from 'react'

import { useCart, useDispatchCart } from '../ContextReducer'

import { useNavigate } from 'react-router-dom';

import Payment from '../paymentspages/payment'

const Card = () => {


  const cartData = useCart()
  // console.log(cartData)

  const [totalPrice, setTotalPrice] = useState(0)



  useEffect(() => {

    // // // This code for total price --->
    let p = 0
    cartData.map((item, i) => {
      p += item.totalPrice
    })

    setTotalPrice(p)

    if(totalPrice > 2000 && totalPrice < 2300){
      alert("Check your pocket dude 😂,So Sorry.")
    }



  }, [cartData])





  const dispatch = useDispatchCart()

  // // // One delete ----->
  async function singleDelete(data) {

    await dispatch({ type: "ONE_DELETE", data: data })

    // console.log(data)
  }

  const navigate = useNavigate();

  // // // all delete handler ----->
  async function handleCheckOut() {
    navigate("/payment");

    // // Dispatch call ---->
    await dispatch({ type: "ALL_DELETE" })

    // // // Logic for add in db --->

    let date = new Date()

    let body = {}
    let token = JSON.parse(localStorage.getItem("getFoodToken"))
    body.token = token
    body.food = [{ date: `${date.toDateString()} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})` }, [...cartData], { totalPrice: totalPrice }]


    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    let logInUser = await fetch(`http://localhost:3001/newOrder`, option)
    let data = await logInUser.json()


    if (data.status === false) {
      return alert(data.message)
    }


    if (data.status === true) {
      return alert(`${data.message} You can see your previous order in My Order Section.`)
    }

  }


  // // // One plus and one minus ----->

  async function oneMinus(data) {

    // // // data.qut must be converted into integer value or str value and then compare acc. ------>
    if (parseInt(data.qut) === 1) {
      await dispatch({ type: "ONE_DELETE", data: data })
      return
    }

    await dispatch({ type: "ONE_MINUS", data: data })
  }


  async function onePlus(data) {
    await dispatch({ type: "ONE_PLUS", data: data })
  }






  return (

    <>

      <div className='container'>

        {/* This is used as heading  */}
        <div className='row'>

          <div className="col-1 d-none d-sm-block text-success fs-3 fw-bold">#</div>
          <div className="col text-success fs-3 fw-bold">Cart Item</div>
          <div className="col-4 text-success fs-3 fw-bold">Amount</div>
          <hr className="text-warning" />

        </div>


        {
          (cartData.length !== 0)
            ?
            cartData.map((data, i) => {
              return (

                <div key={i} className='row' >

                  <div className="col-1 d-none d-sm-block text-info fw-bold">SR. {cartData.length - i}</div>
                  <div className="col ">
                    <div className='mx-1'>
                      <p className='d-sm-none text-info fw-bold'>SR. {cartData.length - i}</p>
                      <p className='fs-4 fw-bold'>{data.name} <span className='fs-6 text-info' >({data.size})</span></p>
                      <p className='fs-5'> <span className='text-warning fw-bold'>{data.qut}</span> <span className='text-info'>*</span> ₹ {data.singlePrice}/-</p>
                    </div>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item ">
                          <a className="page-link " href="#" onClick={() => { oneMinus(data) }}>{ (parseInt(data.qut) > 1)? "-" : <i className="fa-solid fa-trash-can p-0 text-danger"></i> }</a>
                        </li>
                        <li className="page-item fw-bold"><a className="page-link bg-info text-dark disabled px-3" href="#">{data.qut}</a></li>
                        <li className="page-item "><a className="page-link " href="#" onClick={() => { onePlus(data) }}>+</a></li>
                      </ul>
                    </nav>
                    <div>
                      <img className='foodImage mb-3' src={data.image} alt={data.name} style={{ maxWidth: "40vh", maxHeight: "40vh", width: "70%", height: "70%" }} />
                    </div>
                  </div>
                  <div className="col-4 mt-auto mb-5">
                    <h5>₹ {data.totalPrice}/-</h5>
                    <button className='btn btn-outline-danger fw-bold' onClick={() => { singleDelete(data) }}><i className="fa-solid fa-trash-can"></i></button>
                  </div>

                  <hr className="text-warning" />
                </div>
              )
            })

            :

            <div>

              <h1>Your cart is empty😔</h1>
              <h2>Order something please...</h2>
            </div>
        }


        {/* Below div will go in loop or no item msg
        <div className='row'>

          <div className="col-1 d-none d-sm-block text-warning">1.</div>
          <div className="col ">
            <div className='mx-1'>
              <p className='d-sm-none text-warning'>1.</p>
              <p className='fs-4 fw-bold'>NonVeg Thali</p>
              <p className='fs-5'>2 <span className='text-info'>x</span> ₹ 220/-</p>
            </div>
            <div>
              <img className='foodImage mb-1' src="https://thumbs.dreamstime.com/z/indian-non-veg-thali-food-platter-consists-variety-veggies-chicken-meat-lentils-sweet-dish-snacks-etc-selective-focus-225928502.jpg" alt={name || "food"} style={{ width: "70%", height: "70%" }} />
            </div>
          </div>
          <div className="col-4 mt-auto mb-5">
            <h5>₹ 440/-</h5>
            <button className='btn btn-outline-danger fw-bold'>Remove</button>
          </div>

          <hr className="text-warning" />
        </div> */}




        {/* Below div will depend upon items in cart */}
        {
          (cartData.length !== 0)
          &&

          <div>

            <div className='d-flex'><h1 className='fs-2 ms-auto'>Total Price: {totalPrice}/-</h1></div>
            <div className='d-flex'>
              <button className='btn bg-success mt-5 fw-bold text-white ms-auto ' onClick={handleCheckOut} > Order </button>
            </div>
            <p>Please press Check Out and see all order in my order section.</p>
            <h2>Thank you for using...</h2>
          </div>

        }



      </div>


    </>

  )
}

export default Card