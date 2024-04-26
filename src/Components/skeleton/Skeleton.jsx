import React from 'react'

const Skeleton = () => {
    return (
        <>

            <div className='   border border-3 border-warning  rounded p-1' style={{ width: "35vh", display: "inline-block", margin: "4vh 4vh 0 0" }}>

                <div className='foodImage  border-bottom d-flex justify-content-center align-items-center ' >
                    <div className="spinner-grow text-danger fs-1 h-75 w-75" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

                <h3 className='animate_animated animate_zoomInDown checkAk '>Loading ...</h3>
                <div className='d-flex  justify-content-between mb-1'>

                    <div>

                        <select className='bg-success text-white h-100 rounded-start'>
                            <option value="loading">...</option>
                            <option value="loading">...</option>
                            <option value="loading">...</option>

                        </select>

                        <select className='bg-success text-white h-100 rounded-end'>
                            <option value="loading">...</option>
                            <option value="loading">...</option>
                            <option value="loading">...</option>

                        </select>
                    </div>

                    <h4>₹ XXXX/-</h4>
                </div>
                <hr />
                <button className='btn btn-outline-primary mx-2 card_btn_Ak' onClick={ ()=>{alert("Give some time to open actual data.")}} >About</button>
                <button className='btn btn-outline-success mx-2  card_btn_Ak' onClick={ ()=>{alert("Give some time to open actual data.")}} >Add Cart</button>
            </div>
            {/* </div> */}

        </>
    )
}

export default Skeleton