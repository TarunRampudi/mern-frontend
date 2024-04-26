import React, { useState , useRef, useEffect } from 'react'

import done from "./done.mp3"

import "./style.css"

import IndividualFeed from './IndividualFeed'


const ShowAllFeeds = ({getShowFeedBtnDiv}) => {

    const [listOfAllFeeds, setListOfAllFeeds] = useState([])


    // // // useRef hook for scrool down when somthing done.
    const reftoAllFeed = useRef(null);
    const refFeedClickBtn = useRef(null)

    // // // to check network ---------->
    const network = navigator.onLine





    // // // Show all feed handler function ----->
    async function showAllFeedBack() {


        if (network === false) {
            return alert("Please connect with network.\nBecause network connection needed for DB call.")
        }



        let prrocessAllFeed = document.getElementById("process_all_feeds")
        prrocessAllFeed.style.visibility = "visible"
        // prrocessAllFeed.style.display = "block";


        let data = await fetch("https://feedback-hzwx.onrender.com/getFeedback/getFood")

        let a = await data.json()


        if (a.status === false) {
            prrocessAllFeed.style.display = "hidden"
            prrocessAllFeed.style.display = "none"

            return alert(a.message)

        }


        if (a.status === true) {
            // // // Process hide and already shown value ---->
            prrocessAllFeed.style.visibility = "hidden"


            // // // Experiment here (Worked well) --------->
            let data = a.data
            setListOfAllFeeds(data)

            new Audio(done).play()

            let periviousFeedBack = localStorage.getItem("FeedBackForSmallRaectAK")
            if (periviousFeedBack !== "yes") {
                alert("Please Give your valuable feedback for this GetFood web app.\nMy apology for Alert.")
            }


            // // below function for scroll wind to all feeds ---------->
            reftoAllFeed.current?.scrollIntoView({ behavior: "smooth" })


        }

    }



    // // // This fuction is created to scroll window ------------>

    useEffect( ()=>{

        // // Give ref div in that fuction that use to set this value i state variables --->
        // // Below line of code should only used in useEffect() becoz useEffect() code will run when ui get randered --->
        getShowFeedBtnDiv(refFeedClickBtn)

    } ,[] )




    return (
        <>

            <div className="show_all_feeds_topmost_div "  >

                <div className="show_All_FeedBack_main" >
                    <h1>Click on Show Button to see all Feedbacks</h1>
                    <input type="button" ref={refFeedClickBtn} value="Show All Feedbacks" onClick={() => { showAllFeedBack() }} id="show_all_feed_btn" />

                    <div id="process_all_feeds"></div>

                    {/* Experiment -----------> */}

                    <div id="all_feedback" ref={reftoAllFeed}>


                        {


                            listOfAllFeeds.map((item, index) => {

                                return (<IndividualFeed
                                    key={index}
                                    feedbackName={item.feedbackName}
                                    feedbackType={item.feedbackType}
                                    feedbackMsg={item.feedbackMsg}
                                    reply={item.reply}
                                    whenCreated={item.whenCreated}
                                    index={listOfAllFeeds.length-index}
                                />)
                            })



                        }



                    </div>


                </div>

            </div>


        </>
    )
}

export default ShowAllFeeds
