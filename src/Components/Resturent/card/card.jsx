import React, { useEffect, useRef, useState } from 'react'
import "../Body/style.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCart, useDispatchCart } from '../../ContextReducer'


const Card = ({ data, dataOfShowMoreAbout, setShowMoreAboutBtn, index }) => {
    const { _id, image, name, price, size = { "Regular": price, "Special": price + 10 }, quantitiy = [1, 2, 3, 4, 5] } = data

    const qutRef = useRef()
    const sizeRef = useRef()

    const [itemQut, setItemQut] = useState(1)
    const [itemSize, setItemSize] = useState("")


    useEffect(() => {
        setItemQut(qutRef.current.value)
        setItemSize(sizeRef.current.value)
    }, [])



    const totalPrice = () => {
        let p = itemQut * (size[itemSize])

        // // // Priviously i'm using that ------->
        // if (itemSize === "Regular") {
        //     p += 0
        // }
        // else if (itemSize === "Special") {
        //     p += 50
        // }
        // else {
        //     p += 50
        // }

        return p
    }



    const dispatch = useDispatchCart()

    const cartArr = useCart()

    const addToCartHandler = async () => {

        // // // Login require code -------->

        let token = localStorage.getItem("getFoodToken")

        if (!token) {
            return alert(`Please Login first , then Add to cart :- ${name}`)
        }

        // // // Below object is used to maintain value of update food item
        let foodData = {}

        for (let item of cartArr) {
            if ((item.id === _id) && (item.size === itemSize)) {
                foodData = { ...item, size: itemSize, qut: itemQut, totalPrice: totalPrice() }
                break
            }
        }


        if (Object.keys(foodData).length === 0) {
            await dispatch({ type: "ADD", id: _id, name: name, image: image, qut: itemQut, singlePrice: size[itemSize], totalPrice: totalPrice(), size: itemSize })
        }

        else {
            if (foodData.size === itemSize) {
                await dispatch({ type: "UPDATE", id: _id, totalPrice: totalPrice(), qut: itemQut, size: itemSize })
            } else {
                await dispatch({ type: "ADD", id: _id ?? index, name: name, image: image, qut: itemQut, singlePrice: size[itemSize], totalPrice: totalPrice(), size: itemSize })
                console.log("Size different so simply ADD one more to the list")
            }
        }



        toast.success(`${itemQut} X ${name} added in your cart.`, {
            position: "top-right",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }
        )



    }



    // // // Addin data in local storage with cartArr dependancy , so below func run first and every time with var changes ----> 
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartArr))
    }, [cartArr])




    // // // Below is for show about btn ---->
    const about_more_func = (clickedEle) => {
        dataOfShowMoreAbout(clickedEle)
        setShowMoreAboutBtn(true)
    }



    return (
        <>
            <div className="bg-warning border border-warning cardAk" >

                <div className='border border-warning darkCardInnerAk'>
                    <img className='foodImage' src={image} alt={name} />
                    <h3 className='animate__animated animate__zoomInDown card_name '>{name}</h3>
                    <div className='d-flex  justify-content-between mb-1 card_detail'>

                        <div style={{ marginBottom: "1.5vh" }} >

                            <select className='bg-success text-white h-100 rounded-start' ref={sizeRef} value={itemSize} onChange={(e) => { setItemSize(e.target.value) }}>
                                {
                                    Object.keys(size).map((item, i) => { return <option key={i} value={item}>{item}</option> })
                                }
                            </select>
                            <select className='bg-success text-white h-100 rounded-end' ref={qutRef} value={itemQut} onChange={(e) => { setItemQut(e.target.value) }} >
                                {
                                    quantitiy.map((item, i) => { return <option key={i} value={item}>{item}</option> })
                                }
                            </select>
                        </div>

                        <h4 className='animate__animated  animate__rubberBand'>₹ {totalPrice()}/-</h4>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-outline-primary card_btn_Ak' onClick={() => { about_more_func(data) }}>About</button>
                        <button className='btn btn-outline-success card_btn_Ak' onClick={() => { addToCartHandler() }}>Add Cart</button>
                    </div>

                    <ToastContainer />


                </div>

            </div>


        </>
    )
}

export default Card