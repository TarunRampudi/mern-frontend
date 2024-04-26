
import React, { useReducer, useContext, createContext } from "react";




// // // Reducer fn for card data.
// // // By changing simple line i can revers my cardData array -->
// // // Change in adding new item :- add new item first then spread old state value.
// // // now adding new obj first and then spread previous state value 
// // // [ {new add data} , ...state(previous state) ]  , this is simple change.

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            return [ { id: action.id, name: action.name, image: action.image, singlePrice: action.singlePrice, qut: action.qut, totalPrice: action.totalPrice, size: action.size } , ...state];

        case "ONE_DELETE":
            let newStateOneDel = []

            // state.filter((data, i) => {
            //     return ((data.id !== action.data.id) && (data.))
            // })

            state.map((item) => {

                if (item.id !== action.data.id) {
                    newStateOneDel.push(item)
                }else {
                    // // // Here that item come that id get matched , now checking size of item 

                    if (item.size !== action.data.size) {
                        newStateOneDel.push(item)
                    }
                }

            })

            return newStateOneDel;

        case "UPDATE":
            let preArr = [...state]
            preArr.find((item, index) => {
                if ((item.id === action.id) && (item.size === action.size)) {
                    // console.log(parseInt(item.qut) + parseInt(action.qut) , item.totalPrice + action.totalPrice)
                    preArr[index] = { ...item, qut: parseInt(item.qut) + parseInt(action.qut), totalPrice: item.totalPrice + action.totalPrice }
                }
            })

            return preArr;

        case "ALL_DELETE":
            return [];

        case "ONE_MINUS":

            let arr = [...state]
            arr.find((item, index) => {
                if ((item.id === action.data.id) && (item.size === action.data.size)) {
                    // console.log(parseInt(item.qut) + parseInt(action.qut) , item.totalPrice + action.totalPrice)
                    arr[index] = { ...item, qut: parseInt(item.qut) - 1, totalPrice: item.totalPrice - action.data.singlePrice }
                }
            })
            return arr;

        case "ONE_PLUS":

            let arr1 = [...state]
            arr1.find((item, index) => {
                if ((item.id === action.data.id) && (item.size === action.data.size)) {
                    arr1[index] = { ...item, qut: parseInt(item.qut) + 1, totalPrice: item.totalPrice + item.singlePrice }
                }
            })
            return arr1;

            
        default:
            console.log("Something breaks in reducer")
            return [];
    }

}




// // // Here creating contextHook to export data. ( Data will get over-right by context Provider and it's value )
const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);



// // // Creating a component that have card state , dispatch and what ever component coming inside that is taken as children prop.
const CartProvider = ({ children }) => {

    let cartArr = localStorage.getItem("cartItems")
    cartArr = JSON.parse(cartArr)

    const [state, dispatch] = useReducer(reducer, [...cartArr || []])


    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )

}
 

// // // Here creating custome hooks (& export it) for state of card and aslo for dispatch-----> 
const useCart = () => useContext(CartStateContext);
const useDispatchCart = () => useContext(CartDispatchContext);


export { CartProvider, useCart, useDispatchCart }