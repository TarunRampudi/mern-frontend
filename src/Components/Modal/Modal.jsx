import React from 'react'
import ReactDom from 'react-dom'

import "./style.css"

const MODAL_STYLES = {
  padding: "2vh",
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '98%',
  width: '98%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const Modal = ({ children, onClose, title = "I'm Modal" , Div="modal"}) => {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} className="animate__animated animate__slideInUp"  >

        <div className='modal_inner' style={MODAL_STYLES}>
            
          <div className='d-flex ' >
            <h4 className='text-warning '>{title}</h4>
            <button className='btn bg-danger fw-bold ms-auto' onClick={onClose}> X </button>
          </div>
          {/* Here all content present of child prop */}
          {children}
          <div className='bg-danger rounded text-center fw-bold text-black py-1 my-2 cancel_div ' onClick={onClose}>Close this Section</div>
        </div>

      </div>

    </>,
    document.getElementById(Div)
  )
}

export default Modal