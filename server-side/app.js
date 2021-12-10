const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')
var socket= require('socket.io');
const cookieParser = require("cookie-parser");



const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json())
mongoose.connect("mongodb+srv://admin-chaim:Test123@cluster0.n1jx0.mongodb.net/ChatWebProject", {useNewUrlParser: true});

const itemsSchema = {
  senderID: String,
  theSender: String,
  // roomName: String,
  message: String,
  time: String
};
var theUrl;
var userConnected=0;
var user=0;
var maxScore=0;
var maxUser="";

const Items = mongoose.model("item", itemsSchema);

// function updateScroll(){
//   var element = document.getElementById("divscroll");
//   element.scrollTop = element.scrollHeight;
// }
// setInterval(updateScroll,1000);

// app.get('/',function (req, res) {

//   })

app.get("/chat/:rName",  function (req, res) {
  theUrl=req.params.rName;
  // console.log(req.cookies);
  Items.find({},function (err, foundItems) {
    //console.log("found items "+foundItems)
    if (err) {
      console.log(err);
    } else {
      // foundItems.map((item)=>{res.send(item)})
      res.send(JSON.stringify(foundItems));
    }
    })
  // res.set('Access-Control-Allow-Origin', '*');
  
  // res.sendFile(__dirname+"/index.html")
})


app.post('/chat', function (req, res) {
  // res.set('Access-Control-Allow-Origin', '*');
      // console.log(req.body)
    if (Object.keys(req.body).length !== 0) {
      const item = new Items({
        senderID: req.body.senderID,
        theSender: req.body.theSender,
        // roomName: req.body.roomName,
        message: req.body.message,
        time: req.body.time
      });
      item.save();
    }
  })

  let port = process.env.PORT;
  if (port==null||port == "") {
    port =3000;
  }

var server = app.listen(port, function () {
    console.log("app is running on port 5000")
  })

io = socket(server, {
  cors: {
      origin: "https://chat-race.netlify.app",
  }
});
io.on('connection',function (socket) {
  userConnected++;
  maxScore=0;
  maxUser="";
  console.log("we arr connect");
  socket.emit("your id", socket.id);

  socket.on('sent message', body=>{
    user=userConnected;
    console.log(user)
    io.emit('message', body);
    console.log(body);
  })
  

  socket.on("clicked start", quote=>{
    io.emit("selected quote", quote)
  })

  socket.on("timer",data=>{
    io.emit("timer",data)
  })
  socket.on("sendRight",data=>{
    io.emit("disableMsg",data)
  })
  socket.on("endGame",data=>{
    user--;
    if (data.score>maxScore) {
      maxScore=data.score;
      maxUser=data.name;
    }
    else if (data.score===maxScore && data.score!==0) {
        maxUser+=" and "+data.name;
    }
    if(user===0) {
            if (maxUser==="") {
              io.emit("score",{score: maxScore, name: "No One Won"})
            } else {
              io.emit("score",{score: maxScore, name: maxUser})

            }
      }
  })

  socket.on("info",()=>{
    io.emit("getInfo");
  })
  console.log(socket.id)
  // socket.on('join_room', (data)=>{
  //   socket.join(data);
  //   console.log("joined room: "+data.roomName)
  // })

  socket.on("disconnect",()=>{
    userConnected--;
    console.log('socket is disconnected')
  })
  })


