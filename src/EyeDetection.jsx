import React, {useRef, useState} from 'react';
import { Link } from "react-router-dom";
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import {drawMesh} from './utilities';

function EyeDetection() {

  const webcamRef = useRef(null);
  const canvasRef =useRef(null);
  const [enableButton, setEnableButton]=useState(false);

  const runFacemesh = async () =>{
    const net = await facemesh.load({
      inputResolution: {width: 640, height:480}, scale:0.8
    });
    setInterval(()=>{
      detect(net)
    }, 1000);
  }

  const detect = async(net)=>{
    if(typeof webcamRef.current !== "undefined" && webcamRef.current!== null && webcamRef.current.video.readyState===4){
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width= videoWidth;
      video.height= videoHeight;

      canvasRef.current.width= videoWidth;
      canvasRef.current.height= videoHeight;
      
      const face = await net.estimateFaces(video);
      if(face)setEnableButton(true);
 

      const ctx = canvasRef.current ? canvasRef.current.getContext("2d"): null;
      drawMesh(face,ctx);

    }
  }
  runFacemesh();

  return (
    <div className="App">
    {enableButton ? <div style={{backgroundColor:'#282c34'}}><Link to="/turkey" style={{textDecoration: 'none', color:'#0866C2', fontWeight:'bold', fontFamily:'Courier New', fontSize:'3rem'}}>OPEN THE MAP</Link></div> : null} 
      <header className="App-header">
      <Webcam ref={webcamRef} style={{
        position:"absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left:0,
        right:0,
        textAlign:"center",
        zIndex:9,
        width: "100%",
        height:"100%"
      }
    }/>
    <canvas ref={canvasRef}
    style={{
      position:"absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left:0,
        right:0,
        textAlign:"center",
        zIndex:9,
        width: "100%",
        height:"100%"
    }}/> 
    </header> 
    </div>
  );
}

export default EyeDetection;
