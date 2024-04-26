
import React from "react";


const IndividualFeed = ({ feedbackName = "Unknown", feedbackType = "Feedback", index = 0, feedbackMsg = "My feedback is", reply, whenCreated }) => {





    return (

        <div className='user_feeds_are' >
            <h3>Name :- {feedbackName}</h3>
            <p>Type :- {feedbackType}</p>
            <p>Count :- {index} </p>
            <p>Message:- {feedbackMsg}</p>
            <p>Reply:- {reply || "Thank You!"}</p>
            <p>Time:- {whenCreated}</p>

        </div>
    )


}


export default IndividualFeed

