import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import AddLocation from "@material-ui/icons/AddLocation";

function EyeDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#B814E0");
  const [enableButton, setEnableButton] = useState(false);

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      if (face) setEnableButton(true);

      const ctx = canvasRef.current ? canvasRef.current.getContext("2d") : null;
      drawMesh(face, ctx);
    }
  };
  runFacemesh();

  return (
    <div className="App">
      {enableButton ? (
        <Link to="/turkey">
          <div
            style={{ backgroundColor: "#D7B2F8" }}
            onMouseEnter={() => {
              setColor("#791CC9");
            }}
            onMouseLeave={() => {
              setColor("#B814E0");
            }}
          >
            <AddLocation fontSize="large" style={{ color: color }} />
            <span
              style={{
                textDecoration: "none",
                color: color,
                fontWeight: "bold",
                fontFamily: "Avenir",
                fontSize: "2.8rem",
                marginLeft: "1rem",
              }}
            >
              Flueggea Anatolica
            </span>
          </div>
        </Link>
      ) : null}
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: "100%",
            height: "100%",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: "100%",
            height: "100%",
          }}
        />
      </header>
    </div>
  );
}

export default EyeDetection;
