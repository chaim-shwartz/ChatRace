import { Slide, Zoom } from "@mui/material";
import React from "react";
function Blue(props) {

    return (
      <div>
      <Zoom in={true}>
          <Slide direction="up" in={true}> 
          <div className="message-blue">
                <div className="message-name-left">{props.sender}</div>
                <hr/>
                <p className="message-content">{props.message}</p>
                <div className="message-timestamp-left">{props.time}</div>
            </div>
      
          </Slide>
      </Zoom>
    </div>
        
    );
  }
  
  export default Blue;
  