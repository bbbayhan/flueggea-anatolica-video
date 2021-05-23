import React from "react";
import {IMAGE_SRC} from "./plantImages/MapNameToImage";

export const Plant= ({data}) => {
  return (
        <>
      <img src={IMAGE_SRC[data.name]} width="140px"/>
      <p style={{textAlign:"center", color:"#7A1DC9", fontStyle:"italic"}}>{data.name}</p>
    </>
  );
};
