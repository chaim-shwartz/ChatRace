import React, { useEffect, useState } from "react";
import CreateMsg from "./CreateMsg";
import Orange from "./orange";
import { TransitionGroup } from "react-transition-group";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import Blue from "./Blue";
import TheGame from "./TheGame";
import { Zoom } from "@mui/material";

const PORT_SOCKET="https://chat--race.herokuapp.com"

export const socket=io(PORT_SOCKET);


function Chat() {
  const [cookies, setCookies, removeCookies]=useCookies();
  const [dbItems,setDbItems]=useState([]);     //database items array
  const[orangeMsg, setOrangeMsg]=useState([]); //react items array
  const[yourID, setYourID] = useState();        //id of client for socket
  const[messages, setMessages] = useState([]);    //
  const[message, setMessage]= useState("");


  React.useEffect(()=>{
    
    

      // console.log(cookies.theUserDetails.roomName)
      // setUserUrl(cookies.theUserDetails.roomName);
      // console.log("set the user url")


    // socket.emit('join_room', {roomName: cookies.theUserDetails.roomName});
    socket.on("your id",id=>{
      setYourID(id);
    })
    socket.on("message", message=>{
      recivedMessage(message);
      console.log("make the recived function")
    })
  },[PORT_SOCKET])

  function recivedMessage(message){    //set the messages from socket
    // console.log(message)
    setMessages(oldMsgs=>[...oldMsgs,message]);
    updateScroll();

  }
  // console.log(messages);

  //add new message to the react array
  function addMsg(newMsg) {
    // console.log(newMsg)
    setOrangeMsg(prevMsg=>{
      return([...prevMsg,newMsg])
    });
    setMessage("");
    socket.emit("sent message", newMsg);
  }

  // function sendMessage(e) {
  //   e.preventDefault();
  //   const messageObject = {
  //     body: message,
  //     id: yourID
  //   };
  //   // setMessage("");
  //   // socket.emit("send message", messageObject)
  // }
  

  function updateScroll(){//scroll to the last message
    var element = document.getElementById("divscroll");
    element.scrollTop = element.scrollHeight;
  }
 
  
  if (dbItems.length===0) //check if the array of the database items is empty and bring the items
  {
    fetch("https://chat--race.herokuapp.com/chat/"+{}).then(res=>res.json())
         .then(data=>{
          //  console.log(data);
           setDbItems(data); updateScroll();})
  }
  
  

  useEffect(()=>{              //send the item to the server for database
    updateScroll(); 

    fetch(("https://chat--race.herokuapp.com/chat"),{
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(orangeMsg[orangeMsg.length-1])
    }
    )
    .then(res=>res.json())
    .then(data=>console.log(":"+data))
    },[orangeMsg])

    
  return (
    <Zoom in={true} style={{transitionDelay: '70ms'}}>

    <div>
      <TheGame 
        message={messages[messages.length-1]}
      />
      <div className="container">
      <div id="divscroll" className="divScroll">
  
        {dbItems.map((value,index)=>{
          if(value.message!==""&&value.time!==""&&index!==0){
            
            if(value.theSender === cookies.theUserDetails.yourName){
              return(
              <Orange
              key={index}
              id={index}
              sender="You" 
              message={value.message}
              time={value.time}
              />
              )
            }else{
              return(<Blue
              key={index}
              id={index}
              sender={value.theSender} 
              message={value.message}
              time={value.time}/>)
              
            }
            
          }
      })}
      <TransitionGroup
      enter={true}
      exit={false}>
        {/* {orangeMsg.map((value,index)=>{
          if(value.content!==""&&value.time!==""){
                  return(<Orange
                    key={index}
                    id={index} 
                    message={value.message}
                    time={value.time}
                    />)
            }
      })} */}
      {messages.map((value,index)=>{
          if(value.message!==""&&value.time!==""){
            if(value.senderID === yourID){
              return(
              <Orange
              key={index}
              id={index}
              sender="You"
              message={value.message}
              time={value.time}
              />
              )
            }else{
              return(<Blue
              key={index}
              id={index}
              sender={value.theSender} 
              message={value.message}
              time={value.time}/>)
              
            }
            }
      })}
      </TransitionGroup>
      </div>
        <CreateMsg
        addMsg={addMsg}
         />
    </div>
    </div>
    </Zoom>
  );
}

export default Chat;

