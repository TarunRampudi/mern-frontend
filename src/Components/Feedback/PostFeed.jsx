import React, { useState } from 'react'

const PostFeed = ({seeAllBtn}) => {

    let date = new Date()

    const [formInput, setFormInput] = useState({
        feedbackName: "",
        feedbackMsg: "",
        feedbackType: "Feedback",
        feedFromWebName: window.location.href,
        whenCreated: `${date}`

    })

    // console.log( formInput.feedFromWebName  )


    // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< From Handler code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // // // Onchange handler funcion 
    function OnChangeHandler(event) {

        const { name, value } = event.target

        setFormInput((preData) => {
            return {
                ...preData,
                [name]: value
            }
        })

    }


    // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Post New Feed code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // // // Experimet to handle submit form ------>

    async function submitFeedDetailsNew(event) {

        const network = navigator.onLine

        if (network === false) {
            return alert("Please connect with network.\nBecause network connection needed for DB call.")
        }


        let progress = document.getElementById("progress_feed")
        progress.style.width = "0px"
        progress.style.visibility = "visible"


        if (!formInput.feedbackName) {
            setFormInput((p) => {
                return {
                    ...p,
                    feedbackName: "Guest"
                }
            })

        }

        if (!formInput.feedbackMsg) {
            progress.style.visibility = "hidden"
            return alert("Feedback message should be given.")
        }


        let body = formInput

        let option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }


        let data = await fetch("https://feedback-hzwx.onrender.com/newFeedback/getFood", option)

        let a = await data.json()

        if (a.status === false) {
            progress.style.visibility = "hidden"
            return alert(a.message)
        }


        if (a.status === true) {
            // // // Form reset and process hide
            progress.style.visibility = "hidden"

            localStorage.setItem("FeedBackForSmallRaectAK", "yes")

            // // // Scroll wind till getAllFeed btn present ----->
            seeAllBtn.current?.scrollIntoView({ behavior: "smooth" })

            // // Form reset ---------->
            setFormInput({ feedbackName: "", feedbackMsg: "", feedbackType: "Feedback", feedFromWebName: window.location.href, whenCreated: `${date}` })
            return alert("Submited")

        }



        event.preventDefault()
    }




    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Clear feed form Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // // // Clear feed form -->
    const clearFeedDetails = () => {
        setFormInput({
            feedbackName: "",
            feedbackMsg: "",
            feedbackType: "Feedback",
            feedFromWebName: window.location.href,
            whenCreated: `${date}`

        })
    }








    // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< UI Code Starts >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
        <>

            <section>



                {/* Working well --------------> */}

                <div className="d-flex flex-column align-items-center">


                <form action="" id='feed_form' className='m-5 p-3 bg-primary border border-danger rounded '>

                    <h1 className='text-warning p-1 border border-warning border-end-0 border-start-0 rounded-3'>Feedback Form</h1>

                    <div>
                        <label htmlFor='feed_name' ><h2>Visitor Name :-</h2></label><br />
                        <input
                            type="text"
                            placeholder="Guest (Default)" id="feed_name"
                            name="feedbackName"
                            onChange={OnChangeHandler}
                            value={formInput.feedbackName}
                        />
                    </div><br />

                    <h2 >Types of Feedback :-</h2>
                    <div id="feed_radio">
                        <input
                            type="radio"
                            name="feedbackType"
                            value="Feedback"
                            id="feedback_only"
                            defaultChecked={true}
                            onChange={OnChangeHandler}
                        /><label htmlFor='feedback_only' >Feedback</label><br />

                        <input
                            type="radio"
                            name="feedbackType"
                            value="suggestion"
                            id="Suggestion"
                            onChange={OnChangeHandler}
                        /><label
                            htmlFor='Suggestion'>Suggestion</label><br />

                        <input
                            type="radio"
                            name="feedbackType"
                            value="advice"
                            id="advice"
                            onChange={OnChangeHandler}
                        /><label
                            htmlFor='advice'>Advice</label> <br />

                        <input
                            type="radio"
                            name="feedbackType"
                            value="bug"
                            id="bug"
                            onChange={OnChangeHandler}
                        /><label
                            htmlFor='bug'>Bug</label> <br />

                        <input
                            type="radio"
                            name="feedbackType"
                            value="criticize"
                            id="criticize"
                            onChange={OnChangeHandler}
                        /><label
                            htmlFor='criticize' >Don't Like(Message)</label>

                    </div>

                    <div><br />
                        <label htmlFor="feed_msg" ><h2>Feedback Message :-</h2></label> <br />
                        <textarea
                            placeholder="Nice website (Your Feedback Message)"
                            id="feed_msg"
                            cols="30"
                            rows="6"
                            onChange={OnChangeHandler}
                            name="feedbackMsg"
                            value={formInput.feedbackMsg}
                        ></textarea>
                    </div>

                    <div className='d-flex align-items-end' id="feedBtn_div">
                        <input
                            type="button"
                            id="feed_submit_btn"
                            onClick={submitFeedDetailsNew} value="Submit"
                        />
                        <input
                            type="button"
                            value="Clear"
                            onClick={clearFeedDetails} id="clear_btn"
                        />
                    </div>

                    <div id="progress_feed"></div>

                    <p>Give feedback to see all feedback of this website.</p>

                </form> 

            </div> 




       
    


            </section>

        </>
    )
}

export default PostFeed