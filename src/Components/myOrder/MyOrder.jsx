
import "./style.css"

const MyOrder = ({ myOrderData }) => {

    return (
        <>
            {/* {"id":"6413e6d905cf2f5539c8092f","singlePrice":12,"qut":"1","totalPrice":12,"size":"Regular"} */}

            {
                (myOrderData.length !== 0)
                    ?

                    <div>
                        {
                            myOrderData.map((item, index) => {
                                {
                                    return (
                                        <div key={index}>
                                            <h1 className='text-center text-info'>
                                                {item[0].date}
                                                <span className='text-center text-warning fs-4 mx-2'>[{item[1].length} Items] [₹ {item[2].totalPrice || "Not Given"}/-]</span>
                                                <hr />
                                            </h1>                                            
                                            <div className='row mx-auto justify-content-center'>
                                                {

                                                    item[1].map((ele, i) => {
                                                        return (
                                                            <div key={i} className="border border-3 border-info m-3 rounded p-0 order_card" style={{ width: "34vh"}}>
                                                                <img className='foodImage w-100' src={ele.image} alt={ele.name} />
                                                                <div className='px-2 order_detail'>
                                                                    <div>
                                                                        <span>{ele.qut}{" "}</span>
                                                                        <span>{ele.size}{" "}</span>
                                                                        <span>₹{ele.singlePrice}/-</span>
                                                                    </div>
                                                                    <h3>{ele.name}</h3>
                                                                </div>
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                    )

                                }
                            })
                        }
                    </div>

                    :

                    <div>
                        <h1>Getting Your orders Data From DataBase  , Please wait ...</h1>
                    </div>
            }


        </>
    )
}

export default MyOrder