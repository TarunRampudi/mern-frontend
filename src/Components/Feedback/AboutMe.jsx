
import React from "react";

import "./style.css"

const AboutMe = () => {

    return (
        <>
       <div className="d-flex flex-column align-items-center justify-content-center right_content">
               <div className='row' >
                    <div className=" bg-success  border border-bottom-0 border-danger rounded aboutMeAk" >
                        <div className=' d-flex flex-column align-items-center text-center  text-white'>
                            <h1 className='text-danger p-1 border border-danger border-end-0 border-start-0 rounded-3'>About Me</h1>
                           <img src="#" id="about_img" alt="Tarun Pic" /> 
                            <h1>Rampudi Tarun</h1>
                            <div>
                                <a href="#" rel="noreferrer" target={"_blank".toString()} ><img src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Linkedin2_svg-512.png" className="logos" alt="Linkedin" />
                                </a>
                                <a href="#" rel="noreferrer" target={"_blank".toString()} ><img src="https://cdn3.iconfinder.com/data/icons/social-media-2253/25/Group-512.png" className="logos" alt="Github" /></a>
                                <a href="#" rel="noreferrer" target={"_blank".toString()}><img src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Twitter5_svg-512.png" className="logos" alt="Tiwtter" /></a>

                                <a href="#" rel="noreferrer" target={"_blank".toString()} ><img src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Youtube3_svg-512.png" className="logos" alt="Youtube" /></a>
                            </div>
                            <div>
                                <h4>I am learning web development.</h4>
                                <h4>I am following MERN Stack.</h4>
                                <h4>Follow me on social media.</h4>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </>

    )

}
export default AboutMe
