import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./style.css"


import Modal from '../Modal/Modal';

import Cart from "../Cart/Cart"
import MyOrder from '../myOrder/MyOrder';

import { useCart } from "../ContextReducer"

// // // UI function ------------>
const Navbar = ({ items }) => {

    // // // Below these state var is used in show modal(react createPortal div).
    const [viewModalCart, setViewModalCart] = useState(false)
    const [viewModalMyOrders, setViewModalMyOrders] = useState(false)

    // // // Below var is used to check user is previously logedIn or not.
    const isLogedIn = localStorage.getItem("getFoodToken")

    const cartData = useCart()




    // // // My previous order code ------------>
    const [myOrderData, setMyOrderData] = useState([])



    async function myOrderHandler() {

        let body = {
            token: JSON.parse(localStorage.getItem("getFoodToken"))
        }

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        let logInUser = await fetch(`http://localhost:3001/getOrder`, option)
        let inJson = await logInUser.json()


        if (inJson.status === false) {
            return alert(inJson.message)
        }


        if (inJson.status === true) {

            if (inJson.data === null) {
                // // // So now if data will return null means no data found with this userID , so for that case i'm sending a dummy data from front end ---->
                let noItem = [
                    [
                        { date: "No previous Order found, Please order something" },
                        [
                            {
                                image: "https://grocerycart.wawbizstores.com/assets/images/no_order1.png",
                                name: "No Order Found",
                                qut: "0",
                                size: "Nothing",
                                singlePrice: "0000",
                            },
                            {
                                image: "https://grocerycart.wawbizstores.com/assets/images/no_order1.png",
                                name: "No Order Found",
                                qut: "0",
                                size: "Nothing",
                                singlePrice: "0000",
                            },
                            {
                                image: "https://grocerycart.wawbizstores.com/assets/images/no_order1.png",
                                name: "No Order Found",
                                qut: "0",
                                size: "Nothing",
                                singlePrice: "0000",
                            },
                        ],
                        { totalPrice: "0000" }
                    ],
                ]
                return setMyOrderData(noItem)
            } else {
                // // // arr.reverse() function used to receive newes order --------->
                return setMyOrderData(inJson.data.food.reverse())
            }
        }
    }
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-sm bg-success">
                    <div className="container-fluid ">
                        <a className="navbar-brand fs-1 fw-bolder brand_name" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Foodies</a>
                        {/* Below div will only show on clik of brand name */}
                        <div className="collapse" id="collapseExample" style={{ zIndex: "1000" }}>
                            <div className="card card-body position-absolute top-0 end-0 animate__animated animate__rotateInDownLeft">
                                <div>
                                    <a className="btn btn-danger  position-absolute fw-bold top-0 start-0 m-2 " data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">X</a>
                                    <h3 className='text-center text-warning'>About of Foodies</h3>
                                </div>
                                <ul className='text-white'>
                                    <li>This is an <strong>online food delivery</strong> type Web App named <strong>Foodies</strong>. Ex: Zomato and Swiggy.</li>
                                    <li>I have created these features like :- <strong>add foods into cart and order food and see all previous orders</strong>.</li>
                                    <li>In the cart section users can <strong> increase the quantity</strong> of food and can <strong> remove one </strong>item and by clicking on the <strong>Check Out</strong> button your cart will be added into your database and items are ready for delivery.</li>
                                    <li>These features are only accessible once a user is <strong> logged with registered email and password.</strong></li>
                                    <li>An <strong>About section</strong> is present where users can see more about food items and some description related to the food item.</li>
                                    <li>All <strong>displayed food are categories according</strong> to food type.</li>
                                    <li>In the signIn section a <strong> Current Location button</strong> is present that gives the user’s current location that is coming from the free api according to user location , this features need location permission, so if you are ok with that then please check out once.</li>
                                    <li>A <strong>Web skeleton</strong> is present that shows loading... or getting actual data from DB.</li>
                                    <li>A <strong>Feedback section</strong> is present where users can give their valuable feedback by submitting a simple form and he/she can see all previous feedback about this web app by clicking on See All Feedback button.</li>
                                    <li>Thank You!😊</li>
                                </ul>


                                <Link className="btn btn-success fw-bold my-3 " to={"/feed"}>GoTo Feedback Section</Link>

                                <a className="btn btn-danger fw-bold " data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Close Info section</a>
                            </div>
                        </div>
                        {/* <a className="nav-link active  text-white border border-white rounded p-2 ms-1 ms-sm-5" href="#">My Orders</a> */}
                        <div className='ms-auto'>
                            {/* Now i'm using two cart btn , one on rigth of logout in sm and above (with logout btn) and one on left of menu btn in below of sm  */}
                            {/* Cart 1st ++++++++++++++++++++++++ */}
                            {
                                (isLogedIn && (items.length !== 0))
                                &&
                                <button className="rounded border border-2 border-info rounded m-1  p-2 bg-success d-sm-none" >
                                    <Link className="nav-link active fw-bold text-info" to={"/"} onClick={() => { setViewModalCart(true) }}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        {(cartData.length !== 0) && <span className="badge rounded-pill bg-danger" style={{ position: "relative", top: "-15px", left: "15px", marginLeft: "-15px" }} >{cartData.length}</span>}
                                    </Link>
                                </button>
                            }
                            <button className="navbar-toggler m-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse  " id="navbarNav">
                            {
                                (isLogedIn)
                                &&
                                <div className='d-sm-flex'>

                                    <a className="nav-link active text-white p-2 m-1 border border-2 border-white rounded fw-bold d-inline" onClick={() => { setViewModalMyOrders(true); myOrderHandler(); }}>My Orders</a>
                                    <a className="nav-link active text-white p-2 m-1 fw-bold ">
                                        Welcome,{JSON.parse(localStorage.getItem("getFoodUserName")) || "Please LogOut and LogIn Again"}
                                    </a>
                                </div>
                            }
                            {
                                (isLogedIn)

                                    ?
                                    <ul className="navbar-nav ms-auto d-inline-block d-sm-flex ">

                                        {/* Cart 2nd +++++++++++++++++++++++++++ */}
                                        {
                                            (items.length !== 0)
                                            &&
                                            <li className="nav-item  border border-2 border-info rounded m-1 px-1 d-none d-sm-block">

                                                <Link className="nav-link active text-info fw-bold" to={"/"} onClick={() => { setViewModalCart(true) }}>
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                    {(cartData.length !== 0) && <span className="badge rounded-pill bg-danger" style={{ position: "relative", top: "-15px", left: "15px", marginLeft: "-15px" }}>{cartData.length}</span>}
                                                </Link>
                                            </li>
                                        }
                                        <li className="nav-item rounded bg-white m-1  px-1" onClick={() => { localStorage.removeItem("getFoodToken"); alert("LogOut Successful"); window.location.reload(); }}>
                                            <Link className="nav-link active text-danger fw-bold" to={"/"}>LogOut</Link>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="navbar-nav ms-auto d-inline-block d-sm-flex ">
                                        <li className="nav-item  bg-white  rounded m-1  px-1">
                                            <Link className="nav-link active text-success fw-bold" to={"/logIn"} >LogIn</Link>
                                        </li>
                                        <li className="nav-item border border-2 border-white  rounded m-1  px-1">
                                            <Link className="nav-link active fw-bold" to={"/signIn"}>SignIn</Link>
                                        </li>
                                    </ul>

                            }
                        </div>



                    </div>
                </nav>

                {/* Below is used in show cart */}
                {viewModalCart && <Modal onClose={() => { setViewModalCart(false) }} title="My Cart Items"> <Cart /> </Modal>}

                {/* Below is used in show My orders */}
                {viewModalMyOrders && <Modal onClose={() => { setViewModalMyOrders(false) }} title="My Orders History"> <MyOrder myOrderData={myOrderData} /> </Modal>}

            </div>


        </>
    )
}
export default Navbar