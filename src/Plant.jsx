import React, {useState} from "react";
import {IMAGE_SRC} from "./plantImages/MapNameToImage";
import Youtube from 'react-youtube';

export const Plant = ({data}) => {
  const [open, setOpen] = useState(false);
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };


  return open ? (
      <>
       <Youtube videoId="kqUQn2igu6A" opts={opts}/>
       </>
    )
      :
      (
    <>
      <img src={IMAGE_SRC[data.name]} width="140px"/>
      <p style={{textAlign:"center", color:"#7A1DC9", fontStyle:"italic"}}>{data.name}</p>
      <button onClick={()=>setOpen(true)} style={{textDecoration: 'none', color:'#0866C2', fontWeight:'bold', fontFamily:'Courier New', fontSize:'1rem'}}>Open the video</button>
      </>
      )
};
