import React, {useState} from "react";
import {IMAGE_SRC} from "./plantImages/MapNameToImage";
import { Link } from "react-router-dom";

export const Plant = ({data}) => {
  const [open, setOpen] = useState(false);

  return open ? (
      <>
       <iframe width="100%" height="100%" src="https://www.youtube.com/embed/kqUQn2igu6A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
