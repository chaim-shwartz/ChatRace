import { Slide, Zoom } from "@mui/material";
import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';



function Orange(props) {
  

    
    return (
      <div>
      <Zoom in={true}>
          <Slide direction="up" in={true}>     
         <div className="message-orange">
                <div className="message-name-right">{props.sender}</div>
                <hr/>
                <p className="message-content">{props.message}</p>
                <div className="message-timestamp-right">{props.time}</div>
            </div>
            </Slide>
    </Zoom>
      </div>
    );
  }
  
  export default Orange;
  