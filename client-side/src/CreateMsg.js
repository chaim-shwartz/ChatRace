import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import { Zoom } from '@mui/material';
import { useCookies } from "react-cookie";
import { socket } from "./Chat";


function CreateMsg(props) {
    const[yourID, setYourID] = useState();        //id of client for socket
    const date = new Date();
    const [cookies, setCookies, removeCookies]=useCookies()  //the user details cookie
    const [sentMsg, setSentMsg]=useState({                   //the message details
        senderID: "",
        theSender:"",
        // roomName:"",
        message: "",
        time: ""
    });

    const[disMsg ,setDisMsg]=useState(false); //disable to send messages


    useEffect(() => {
        socket.on("your id",id=>{
            setYourID(id);
            console.log(id)
          })
    }, [])
    
    //check if the user write something
    var thereIsText=false;
    if(sentMsg.message==="") {
        thereIsText=false;
    }else{
        thereIsText=true;
    }
    
    
    
    function handleChange(event){
        const hour=date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes();
        setSentMsg({
            senderID: yourID,
            theSender:cookies.theUserDetails.yourName,
            // roomName:cookies.theUserDetails.roomName,
            message: event.target.value,
            time: hour
        });
    }
    
    //click function when the user send the message
    function sendClick(e) {
        if (sentMsg.message==="") {
            alert("type something")  
        }else{
            props.addMsg(sentMsg); 
            setSentMsg({
                senderID: "",
                theSender:"",
                // roomName:"",
                message:"",
                time: ""
            });
        }
        e.preventDefault();
    }

    
    //when to disable to send messages
  socket.on("disableMsg",data=>{
    setDisMsg(data);
})
    return(<div>
        <form action="/chat" method="POST">
        <div className="chat-input">
        <Zoom in={true} style={{transitionDelay: '70ms'}}>
            <input disabled={disMsg} autoComplete="off" onChange={handleChange} name="message" type="text" value={sentMsg.message} placeholder="send a message"/>

        </Zoom>
            {/* <Button  id="sendBtn" type="submit" onClick={sendClick}></Button> */}
            <Zoom in={thereIsText} style={{ transitionDelay: thereIsText ? '50ms' : '0ms' }}>
                <IconButton type="submit" onClick={sendClick} color="success"><SendIcon/></IconButton>
            </Zoom>
        </div>
      </form>
    </div>)
}

export default CreateMsg;