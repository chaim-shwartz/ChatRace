import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "./Chat";
import { useCookies } from "react-cookie";



function TheGame(props) {
    
    const [timer, setTimer]=useState();//the time
    const [click, setClick]=useState(false);
    const [userWon, setUserWon]=useState("no one");
    const [hideTable, setHideTable]=useState(true);
    const [quote, setquote]=useState("");
    const [start, setStart] = useState(0);
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);
    const [cookies, setCookies, removeCookies]=useCookies()  //the user details cookie
    const [userScore, setUserScore]=useState(0);
    const [endBtn, setEndBtn]=useState(false);
    const [theWinner,setTheWinner]=useState("")
    const [info,setInfo]=useState("")



    function startClick() {// the function of the start button
        setClick(true);
        socket.emit("sendRight",false)
        fetch("https://api.quotable.io/random").then(res=>res.json())
        .then(data=>{
                setquote(data.content);
          })
    }
    useEffect(() => {
        console.log("run")

        if(quote!==""&&quote!=="click the button to the next quote"){
            socket.emit("clicked start",{quote});
        }
        socket.on("selected quote", qu=>{
                setHideTable(false);
                setTimer(3);
                setquote(qu.quote);
                setClick(true);
        })
    },[quote]);

    useEffect(() => {
        socket.on("timer",seconds=>{
            if (seconds>0) {
                setTimer(seconds)
            }
        });
        if (click===true) {
            socket.emit("timer",timer);
            let myInterval = setInterval(() => {
                if (timer >= 0) {
                    setTimer(timer - 1);
                    
                }
                if (timer === 0) {
                    setStart(Date.now())
                    clearInterval(myInterval);
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
            };
            
        }
    },[timer]);
    socket.on("message",msg=>{
        if (msg.message === quote) {
            setClick(false);
            setUserWon(msg.theSender)
            if (msg.theSender===cookies.theUserDetails.yourName) {
                setScore(score+1)
            }
            setTime(Date.now()-start) 
            socket.emit("sendRight",true);
            // console.log("yes");
            setquote("click the button to the next quote");
            
        }else{
            // console.log("no");
        }   
    })
    function endGame() {
        setEndBtn(true);
        socket.emit("endGame",{score: score,name: cookies.theUserDetails.yourName});
        socket.emit("info");
    }            
    socket.on("getInfo",()=>{
      setInfo("Player want to end the game! press exit!")
    })
    socket.on("score",data=>{
          
        setScore(data.score);
        setTheWinner(data.name);
        // if(data.name===undefined)
        // { 
        //     setScore(data.score)
        //     setTheWinner("Tie")
        // }
        // else{
        //   if (score>=data.score) {
        //       setScore(score)
        //       setTheWinner(data.name)
        //   } else {
        //       setScore(data.score)
        //       setTheWinner(data.name)
        //   }
        // }
    })
        
        
        
    
    if (endBtn) {

        return(
        <div>
            <h1  style={{color: "#0C4271"}}>end game</h1>
            <h1 style={{color: "#0C4271"}}>{theWinner===""?"waiting for the other player":"the winner:  "+theWinner+", score: "} {score}</h1>
        </div>
        )
    }else{
        return(
            <div align="center">
                <Zoom in={!hideTable}style={{ transitionDelay: '70ms'}}>
                    <Button onClick={endGame} sx={{position:"absolute",backgroundColor:"#F9D5A7", right:"10px",
                    '&:hover': {
                        backgroundColor: '#FFB085',
                        transform: "scale3d(1.05, 1.05, 1)"
                    }}}>exit game</Button>
                </Zoom>

                <Zoom in={true}>
                    <h1 hidden={!hideTable} style={{color: "#0C4271", marginBottom: 0}}>Chat Race</h1>
                </Zoom>
                <Zoom in={!hideTable} hidden={hideTable} style={{ transitionDelay: '70ms'}}>
                    <h1 style={{color: "#0C4271"}}>your score {score}</h1>
                </Zoom>
                <Zoom in={!hideTable} style={{ transitionDelay: '70ms'}}>
                <TableContainer hidden={hideTable} style={{width: "35%", backgroundColor:"#F9D5A7"}} component={Paper}>
                <Table align="center" sx={{ maxWidth: "auto", backgroundColor:"#F9D5A7"}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: "#628395", padding:"5px", fontSize:"112%"}} align="center">fster</TableCell>
                            <TableCell sx={{color: "#628395", padding:"5px", fontSize:"112%"}} align="center">time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{color: "#628395", padding:"5px", fontSize:"112%"}} align="center">{userWon}</TableCell>
                            <TableCell sx={{color: "#628395", padding:"5px", fontSize:"112%"}} align="center">{time/1000}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
                
                </Zoom>
                
                <Zoom in={info!==""} style={{ transitionDelay: '70ms'}}>
                    <h1 style={{color: "#DF5E5E"}}>{info}</h1>
                </Zoom>
                <Zoom in={!click} style={{ transitionDelay: '70ms'}}>
                    <Button disabled={click} 
                    sx={{backgroundColor:"#F9D5A7",
                    '&:hover': {
                        backgroundColor: '#FFB085',
                        transform: "scale3d(1.05, 1.05, 1)",
                        transition: "background 1s, color 1s",


                    }}}
                    style={{margin:"0px"}} color="primary" onClick={startClick}>{quote===""?"Start The Game":"Next Quote"}</Button>
                </Zoom>
                <Zoom in={true} style={{transitionDelay: '70ms'}}>
                    <p style={{color: "#0C4271", fontSize:"20px", fontStyle:"bold", margin:"5px"}}>{timer>=0? timer: quote}</p>
                </Zoom>

                
            </div>
        )
    }
    
  }
  export default TheGame;