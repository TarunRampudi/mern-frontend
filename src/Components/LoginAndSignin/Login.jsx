import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './style.css'
import { ToastContainer, toast } from 'react-toastify';



const Login = () => {

  const navigate = useNavigate();

  const [logInData, setLogInData] = useState({
    email: "",
    password: ""
  })
  const handleAdminLogin = () => {
    localStorage.setItem("isAdmin", "true");
    navigate("/admin");
  };


  function onChangeHandler(e) {
    const { name, value } = e.target
    setLogInData((preData) => {
      return ({ ...preData, [name]: value })
    })
  }


  async function onClickHandler(e) {
    e.preventDefault()

    if (!logInData.email || !logInData.password) {
      return alert("All feild should given")
    }

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInData)
    }

    let logInUser = await fetch(`http://localhost:3001/logIn`, option)
    let data = await logInUser.json()


    if (data.status === false) {
      return alert(data.message)
    }


    if (data.status === true) {
      setLogInData({ email: "", password: "" })
      let userName = data.data.name
      localStorage.setItem("getFoodToken", JSON.stringify(data.token))
      localStorage.setItem("getFoodUserName", JSON.stringify(userName))



      toast.success("LogIn successfull. Welcome," + JSON.stringify(userName), {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

      setTimeout(() => {
        return navigate("/")
      }, 1200)

    }

  }





  return (
    <>

      <ToastContainer />

      <div id='log_in_div' className="log_sing_main" style={{ background: "url('https://img.delicious.com.au/nnzbvV91/w1200/del/2018/05/green-and-gold-rice-bowls-80254-2.jpg')", backgroundSize: "cover" }}>

        <div className="log_sing_second border  border-info  rounded rounded-3 p-5 bg-dark">

          <form>
            <h1 className='text-center text-info'>LogIn</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email Address</label>
              <input type="email" className="form-control bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={logInData.email} onChange={onChangeHandler} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
              <input type="password" className="form-control bg-dark" id="exampleInputPassword1" name="password" value={logInData.password} onChange={onChangeHandler} />
            </div>
            <button type="submit" className="btn btn-success m-1" onClick={onClickHandler}>LogIn</button>
            <button className="btn btn-primary m-1" onClick={() => { navigate("/signIn") }} >New User</button>
            <button type="submit" className="btn btn-success m-1" onClick={handleAdminLogin}>Admin login</button>

          </form>
        </div>

        <button className=' btn btn-dark btn-lg fw-bold home_btn' onClick={() => { navigate("/") }}><i className="fa-solid fa-house"></i></button>


      </div>


    </>
  )
}

export default Login