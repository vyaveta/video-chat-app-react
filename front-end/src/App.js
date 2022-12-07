import React from "react";
import './App.css'
import { Typography , AppBar } from '@material-ui/core'

import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      {/* <AppBar position="static" color="inherit" >
        <Typography variant="h2" align='center' >Video Chat</Typography>
      </AppBar> */}
      <Header name='Atatsuki' />
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
