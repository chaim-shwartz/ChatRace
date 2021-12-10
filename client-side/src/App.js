import React from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [cookie] = useCookies();
  var nUrl;
  // console.log(cookie.theUserDetails)
  if (cookie.theUserDetails===undefined) {
    nUrl=""
  } else {
    nUrl=cookie.theUserDetails.yourName;
  }


  return(
  <Router>
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>
      <Route exact path={"/chat/"+nUrl}>
      <div >
        <Chat/>
      </div>
      </Route>
    </Switch>
 </Router>
 )
  
  }
  export default App;