import { useState } from "react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AudioProvider from "./context/AudioConrol.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AudioProvider>
    <App />
  </AudioProvider>
)
