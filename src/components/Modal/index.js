import React, { Component } from "react";
import { createPortal } from "react-dom";
import { withRouter } from 'react-router-dom';
import './style.scss';

const Modal = withRouter(({history, children,onClick}) => {
    return createPortal(
      <div>
        <div className='overlay' onClick={() => history.goBack()}></div>
        <div className='modal'>
          {children}
        </div>
      </div>,
      document.getElementById("modal_root"),
    );
})

export default Modal;